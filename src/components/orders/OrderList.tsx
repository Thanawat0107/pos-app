import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useGetOrderAllQuery } from "../../services/orderApi";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import Pagination from "../pagination/Pagination";
import { DataTable } from "react-native-paper";
import { styles } from "./OrderList.Style";

type ColKey =
  | "id"
  | "orderCode"
  | "orderTag"
  | "orderType"
  | "customerName"
  | "channel"
  | "orderStatus"
  | "subTotal"
  | "discount"
  | "total"
  | "createdAt"
  | "paidAt"
  | "items"
  | "payment";

const COLS: Array<{ key: ColKey; label: string; width: number; numeric?: boolean }> = [
  { key: "id",           label: "Order ID",     width: 90 },
  { key: "orderCode",    label: "Code",         width: 120 },
  { key: "orderTag",     label: "Tag",          width: 100 },
  { key: "orderType",    label: "Type",         width: 100 },
  { key: "customerName", label: "Customer",     width: 140 },
  { key: "channel",      label: "Channel",      width: 100 },
  { key: "orderStatus",  label: "Status",       width: 120 },
  { key: "subTotal",     label: "Subtotal",     width: 110, numeric: true },
  { key: "discount",     label: "Discount",     width: 100, numeric: true },
  { key: "total",        label: "Total",        width: 110, numeric: true },
  { key: "createdAt",    label: "Created",      width: 130 },
  { key: "paidAt",       label: "Paid",         width: 130 },
  { key: "items",        label: "Items",        width: 60,  numeric: true },
  { key: "payment",      label: "Payment",      width: 80 },
];

const TABLE_MIN_WIDTH = COLS.reduce((sum, c) => sum + c.width, 0);

const formatBaht = (n?: number) =>
  typeof n === "number" ? `฿${n.toLocaleString('th-TH', { minimumFractionDigits: 2 })}` : "—";

const formatDateTime = (s?: string) => {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "—";
  
  return d.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit", 
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case 'pending': return '#FF9500';
    case 'completed': return '#34C759';
    case 'cancelled': return '#FF3B30';
    case 'processing': return '#007AFF';
    case 'ready': return '#5AC8FA';
    case 'served': return '#30D158';
    case 'cooking': return '#FF6B35';
    default: return '#8E8E93';
  }
};

const getChannelColor = (channel?: string) => {
  switch (channel?.toLowerCase()) {
    case 'dine-in': return '#007AFF';
    case 'takeaway': return '#FF9500';
    case 'delivery': return '#34C759';
    case 'online': return '#5856D6';
    default: return '#8E8E93';
  }
};

const getStatusBadgeStyle = (status?: string) => ({
  backgroundColor: getStatusColor(status),
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 12,
  minWidth: 70,
  alignItems: 'center' as const,
});

const getChannelBadgeStyle = (channel?: string) => ({
  backgroundColor: getChannelColor(channel),
  paddingHorizontal: 6,
  paddingVertical: 3,
  borderRadius: 8,
  minWidth: 60,
  alignItems: 'center' as const,
});

const CellText = ({
  children,
  align,
  style,
}: {
  children?: React.ReactNode;
  align?: "left" | "right" | "center";
  style?: any;
}) => (
  <Text
    numberOfLines={1}
    ellipsizeMode="tail"
    style={[
      styles.cellText, 
      align ? { textAlign: align } : null,
      style
    ]}
  >
    {children ?? "—"}
  </Text>
);

const StatusBadge = ({ status }: { status?: string }) => (
  <View style={getStatusBadgeStyle(status)}>
    <Text style={[styles.statusText, { color: 'white' }]}>
      {status || '—'}
    </Text>
  </View>
);

const ChannelBadge = ({ channel }: { channel?: string }) => (
  <View style={getChannelBadgeStyle(channel)}>
    <Text style={[styles.channelText, { color: 'white' }]}>
      {channel || '—'}
    </Text>
  </View>
);

const PaymentIcon = ({ payment }: { payment?: any }) => {
  const isPaid = payment && payment.id;
  return (
    <View
      style={[
        styles.paymentIcon,
        { backgroundColor: isPaid ? "#34C759" : "#FF3B30" },
      ]}
    >
      <Text style={styles.paymentText}>{isPaid ? "✓" : "✗"}</Text>
    </View>
  );
};

const CustomerName = ({ name }: { name?: string | null }) => (
  <View style={styles.customerContainer}>
    <Text style={styles.customerText} numberOfLines={1}>
      {name || "Walk-in"}
    </Text>
  </View>
);

// หยิบ width ตาม key
const w = (key: ColKey) => ({ width: COLS.find((c) => c.key === key)!.width });

const OrderList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigation = useAppNavigation();

  const { data, isLoading, isError, isFetching } = useGetOrderAllQuery({
    pageNumber,
    pageSize,
  });

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ Error loading orders</Text>
        <TouchableOpacity style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const orders = data?.data ?? [];
  const meta = data?.meta;

  // Calculate summary statistics
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const paidOrders = orders.filter(order => order.payment?.id).length;
  const pendingOrders = orders.filter(order => order.orderStatus?.toLowerCase() === 'pending').length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>รายการออเดอร์</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("OrderForm")}
        >
          <Text style={styles.createButtonText}>+ สร้างออเดอร์</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Stats */}
      {meta && (
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Orders</Text>
            <Text style={styles.summaryValue}>{meta.totalCount || 0}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Page Revenue</Text>
            <Text style={[styles.summaryValue, styles.revenueText]}>
              {formatBaht(totalRevenue)}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Paid Orders</Text>
            <Text style={[styles.summaryValue, styles.paidText]}>
              {paidOrders}/{orders.length}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Pending</Text>
            <Text style={[styles.summaryValue, styles.pendingText]}>
              {pendingOrders}
            </Text>
          </View>
        </View>
      )}

      {/* Page Info */}
      {meta && (
        <View style={styles.pageInfoContainer}>
          <Text style={styles.pageInfo}>
            Page {meta.pageNumber} of {meta.pageCount || 1} • Showing {orders.length} of {meta.totalCount} orders
          </Text>
        </View>
      )}

      {/* Table */}
      <View style={styles.tableContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          style={styles.horizontalScroll}
        >
          <DataTable style={{ minWidth: TABLE_MIN_WIDTH }}>
            <DataTable.Header style={styles.tableHeader}>
              {COLS.map((col) => (
                <DataTable.Title
                  key={col.key}
                  numeric={col.numeric}
                  style={[w(col.key), styles.headerCell, styles.centerCell]}
                >
                  <CellText align="center" style={styles.headerText}>
                    {col.label}
                  </CellText>
                </DataTable.Title>
              ))}
            </DataTable.Header>

            {orders.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>📋 No orders found</Text>
                <Text style={styles.emptySubtext}>
                  Create your first order to get started
                </Text>
              </View>
            ) : (
              orders.map((item, rowIdx) => (
                <DataTable.Row
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("OrderDetails", { orderId: item.id })
                  }
                  style={[
                    styles.tableRow,
                    rowIdx % 2 ? styles.zebra : styles.evenRow,
                  ]}
                >
                  {/* Order ID */}
                  <DataTable.Cell style={[w("id"), styles.centerCell]}>
                    <CellText align="center" style={styles.idText}>{item.id}</CellText>
                  </DataTable.Cell>

                  {/* Order Code */}
                  <DataTable.Cell style={[w("orderCode"), styles.centerCell]}>
                    <CellText align="center" style={styles.codeText}>
                      {item.orderCode || "—"}
                    </CellText>
                  </DataTable.Cell>

                  {/* Order Tag */}
                  <DataTable.Cell style={[w("orderTag"), styles.centerCell]}>
                    <CellText align="center" style={styles.tagText}>
                      {item.orderTag || "—"}
                    </CellText>
                  </DataTable.Cell>

                  {/* Order Type */}
                  <DataTable.Cell style={[w("orderType"), styles.centerCell]}>
                    <CellText align="center">
                      {item.orderType || "—"}
                    </CellText>
                  </DataTable.Cell>

                  {/* Customer Name */}
                  <DataTable.Cell style={[w("customerName"), styles.centerCell]}>
                    <CustomerName name={item.customerName} />
                  </DataTable.Cell>

                  {/* Channel */}
                  <DataTable.Cell style={[w("channel"), styles.centerCell]}>
                    <ChannelBadge channel={item.channel} />
                  </DataTable.Cell>

                  {/* Status */}
                  <DataTable.Cell style={[w("orderStatus"), styles.centerCell]}>
                    <StatusBadge status={item.orderStatus} />
                  </DataTable.Cell>

                  {/* Financial Data */}
                  <DataTable.Cell style={[w("subTotal"), styles.centerCell]}>
                    <CellText align="center" style={styles.moneyText}>
                      {formatBaht(item.subTotal)}
                    </CellText>
                  </DataTable.Cell>
                  <DataTable.Cell style={[w("discount"), styles.centerCell]}>
                    <CellText align="center" style={[styles.moneyText, styles.discountText]}>
                      {formatBaht(item.discount)}
                    </CellText>
                  </DataTable.Cell>
                  <DataTable.Cell style={[w("total"), styles.centerCell]}>
                    <CellText align="center" style={[styles.moneyText, styles.totalText]}>
                      {formatBaht(item.total)}
                    </CellText>
                  </DataTable.Cell>

                  {/* Dates */}
                  <DataTable.Cell style={[w("createdAt"), styles.centerCell]}>
                    <CellText align="center" style={styles.dateText}>
                      {formatDateTime(item.createdAt)}
                    </CellText>
                  </DataTable.Cell>
                  <DataTable.Cell style={[w("paidAt"), styles.centerCell]}>
                    <CellText align="center" style={styles.dateText}>
                      {formatDateTime(item.paidAt)}
                    </CellText>
                  </DataTable.Cell>

                  {/* Items count */}
                  <DataTable.Cell style={[w("items"), styles.centerCell]}>
                    <View style={styles.itemsCountContainer}>
                      <Text style={styles.itemsCount}>
                        {Array.isArray(item.orderDetails)
                          ? item.orderDetails.length
                          : 0}
                      </Text>
                    </View>
                  </DataTable.Cell>

                  {/* Payment */}
                  <DataTable.Cell style={[w("payment"), styles.centerCell]}>
                    <PaymentIcon payment={item.payment} />
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            )}
          </DataTable>
        </ScrollView>
      </View>

      {/* Pagination */}
      {meta && orders.length > 0 && (
        <View style={styles.paginationContainer}>
          <Pagination
            meta={meta}
            page={pageNumber - 1}
            numberOfItemsPerPage={pageSize}
            onPageChange={(page) => setPageNumber(page + 1)}
            onItemsPerPageChange={(size) => {
              setPageSize(size);
              setPageNumber(1);
            }}
            numberOfItemsPerPageList={[5, 10, 20, 50]}
          />
        </View>
      )}

      {/* Loading overlay */}
      {isFetching && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingOverlayText}>Refreshing...</Text>
        </View>
      )}
    </View>
  );
};

export default OrderList;
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
  | "orderStatus"
  | "subTotal"
  | "discount"
  | "total"
  | "createdAt"
  | "paidAt"
  | "items"
  | "payment";

const COLS: Array<{ key: ColKey; label: string; width: number; numeric?: boolean }> = [
  { key: "id",         label: "Order ID",   width: 100 },
  { key: "orderCode",  label: "Code",       width: 140 },
  { key: "orderTag",   label: "Tag",        width: 120 },
  { key: "orderType",  label: "Type",       width: 120 },
  { key: "orderStatus",label: "Status",     width: 130 },
  { key: "subTotal",   label: "Subtotal",   width: 120, numeric: true },
  { key: "discount",   label: "Discount",   width: 110, numeric: true },
  { key: "total",      label: "Total",      width: 120, numeric: true },
  { key: "createdAt",  label: "Created",    width: 140 },
  { key: "paidAt",     label: "Paid",       width: 140 },
  { key: "items",      label: "Items",      width: 70,  numeric: true },
  { key: "payment",    label: "Payment",    width: 90 },
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
  }).replace(/\//g, '/');
};

const getStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case 'pending': return '#FF9500';
    case 'completed': return '#34C759';
    case 'cancelled': return '#FF3B30';
    case 'processing': return '#007AFF';
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

const PaymentIcon = ({ paid }: { paid?: boolean }) => (
  <View
    style={[
      styles.paymentIcon,
      { backgroundColor: paid ? "#34C759" : "#FF3B30" },
    ]}
  >
    <Text style={styles.paymentText}>{paid ? "✓" : "✗"}</Text>
  </View>
);

// หยิบ width ตาม key
const w = (key: ColKey) => ({
  width: COLS.find((c) => c.key === key)!.width,
  justifyContent: "center" as const,
  alignItems: "center" as const,
});

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>การจัดการออเดอร์</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("OrderForm")}
        >
          <Text style={styles.createButtonText}>+ สร้างออเดอร์</Text>
        </TouchableOpacity>
      </View>

      {/* Summary */}
      {meta && (
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Orders</Text>
            <Text style={styles.summaryValue}>{meta.totalCount || 0}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Current Page</Text>
            <Text style={styles.summaryValue}>
              {meta.pageNumber} / {meta.pageCount || 1}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Page Size</Text>
            <Text style={styles.summaryValue}>{meta.pageSize}</Text>
          </View>
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
                  style={[w(col.key), styles.headerCell]}
                >
                  <CellText
                    align={col.numeric ? "right" : "left"}
                    style={styles.headerText}
                  >
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
                    navigation.navigate("OrderDetail", { orderDetailId: item.id })
                  }
                  style={[
                    styles.tableRow,
                    rowIdx % 2 ? styles.zebra : styles.evenRow,
                  ]}
                >
                  {/* Order ID */}
                  <DataTable.Cell style={w("id")}>
                    <CellText style={styles.idText}>{item.id}</CellText>
                  </DataTable.Cell>

                  {/* Code */}
                  <DataTable.Cell style={w("orderCode")}>
                    <CellText style={styles.codeText}>
                      {item.orderCode || "—"}
                    </CellText>
                  </DataTable.Cell>

                  {/* Tag */}
                  <DataTable.Cell style={w("orderTag")}>
                    <CellText>{item.orderTag || "—"}</CellText>
                  </DataTable.Cell>

                  {/* Type */}
                  <DataTable.Cell style={w("orderType")}>
                    <CellText>{item.orderType || "—"}</CellText>
                  </DataTable.Cell>

                  {/* Status */}
                  <DataTable.Cell style={w("orderStatus")}>
                    <StatusBadge status={item.orderStatus} />
                  </DataTable.Cell>

                  {/* Financial Data */}
                  <DataTable.Cell numeric style={w("subTotal")}>
                    <CellText align="right" style={styles.moneyText}>
                      {formatBaht(item.subTotal)}
                    </CellText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={w("discount")}>
                    <CellText
                      align="right"
                      style={[styles.moneyText, styles.discountText]}
                    >
                      {formatBaht(item.discount)}
                    </CellText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={w("total")}>
                    <CellText
                      align="right"
                      style={[styles.moneyText, styles.totalText]}
                    >
                      {formatBaht(item.total)}
                    </CellText>
                  </DataTable.Cell>

                  {/* Dates */}
                  <DataTable.Cell style={w("createdAt")}>
                    <CellText style={styles.dateText}>
                      {formatDateTime(item.createdAt)}
                    </CellText>
                  </DataTable.Cell>
                  <DataTable.Cell style={w("paidAt")}>
                    <CellText style={styles.dateText}>
                      {formatDateTime(item.paidAt)}
                    </CellText>
                  </DataTable.Cell>

                  {/* Items count */}
                  <DataTable.Cell numeric style={w("items")}>
                    <View style={styles.itemsCountContainer}>
                      <Text style={styles.itemsCount}>
                        {Array.isArray(item.orderDetails)
                          ? item.orderDetails.length
                          : 0}
                      </Text>
                    </View>
                  </DataTable.Cell>

                  {/* Payment */}
                  <DataTable.Cell style={w("payment")}>
                    <PaymentIcon />
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
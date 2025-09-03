import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { OrderDetail } from "../../@types/dto/OrderDetail";
import { OrderDetailOption } from "../../@types/dto/OrderDetailOption";
import { styles } from "./OrderDetails.Style";
import { useGetOrderByIdQuery, useUpdateOrderMutation, useUpdateOrderStatusMutation } from "../../services/orderApi";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { SD_OrderStatus } from "../../@types/Enum";
import { getStatusMeta } from "../../helpers/getStatusMeta";

type Props = {
  route?: { params?: { orderId: number } };
};

const formatCurrencyTHB = (amount: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDateTime = (iso?: string) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString("th-TH", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const getOptionLabel = (opt: OrderDetailOption) =>
  `${opt.optionGroupName}: ${opt.optionValueName}`;
const getOptionQty = (opt: OrderDetailOption) =>
  typeof opt.quantity === "number" ? opt.quantity : 1;
const getOptionExtra = (opt: OrderDetailOption) =>
  typeof opt.extraPrice === "number" ? opt.extraPrice : 0;

const Divider = () => <View style={styles.divider} />;

const Badge = ({
  label,
  tone = "primary",
}: {
  label: string;
  tone?: "primary" | "danger" | "muted";
}) => {
  const toneStyle =
    tone === "danger"
      ? styles.badgeDanger
      : tone === "muted"
      ? styles.badgeMuted
      : styles.badgePrimary;
  return (
    <View style={[styles.badge, toneStyle]}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
};

const PriceRow = ({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: number;
  emphasize?: boolean;
}) => (
  <View style={styles.rowBetween}>
    <Text style={[styles.labelText, emphasize && styles.emLabel]}>{label}</Text>
    <Text style={[styles.valueText, emphasize && styles.emValue]}>
      {formatCurrencyTHB(value)}
    </Text>
  </View>
);

const OptionChip = ({
  label,
  qty,
  extra,
}: {
  label: string;
  qty: number;
  extra: number;
}) => (
  <View style={styles.optionChip}>
    <Text style={styles.optionChipText} numberOfLines={1}>
      {label}
    </Text>
    {!!qty && qty !== 1 && <Text style={styles.optionMeta}>×{qty}</Text>}
    {!!extra && (
      <Text style={styles.optionMeta}>+{formatCurrencyTHB(extra)}</Text>
    )}
  </View>
);

const OrderDetails = ({ route }: Props) => {
  const navigation = useAppNavigation();
  const orderId = route?.params?.orderId!;

  const {
    data: header,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetOrderByIdQuery(orderId, { skip: !orderId });
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const [updateOrderStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderStatusMutation();

// modal state
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountValue, setDiscountValue] = useState<string>("0");
  const [showStatusModal, setShowStatusModal] = useState(false);

  // loading
  if (!orderId || isLoading) {
    return (
      <View style={[styles.center, { flex: 1 }]}>
        <ActivityIndicator />
        <Text style={{ marginTop: 12 }}>กำลังโหลดรายละเอียด…</Text>
      </View>
    );
  }

  // error
  if (error || !header) {
    return (
      <View style={[styles.center, { flex: 1, padding: 24 }]}>
        <Text style={styles.emptyTitle}>โหลดข้อมูลไม่สำเร็จ</Text>
        <Text style={styles.emptySub}>ลองกดโหลดใหม่</Text>
        <Pressable
          style={[styles.btn, styles.btnPrimary, { marginTop: 12 }]}
          onPress={refetch}
        >
          <Text style={[styles.btnText, styles.btnPrimaryText]}>
            โหลดอีกครั้ง
          </Text>
        </Pressable>
      </View>
    );
  }

  // เลือก "หนึ่งรายการ" ที่จะโชว์
  const list: OrderDetail[] = (header as any)?.orderDetails ?? [];

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      refreshControl={
        <RefreshControl refreshing={!!isFetching} onRefresh={refetch} />
      }
    >
      {/* Header */}
      <View style={styles.card}>
        <Text style={styles.title}>
          ออเดอร์ที่ {header.id} — {header.orderCode ?? "-"}
        </Text>

        <Text style={styles.metaText}>
          สถานะปัจจุบัน: {getStatusMeta(header.orderStatus).icon}{" "}
          {getStatusMeta(header.orderStatus).label}
        </Text>

        <Pressable
          style={[styles.btn, styles.btnPrimary, { marginTop: 12 }]}
          onPress={() => setShowStatusModal(true)}
        >
          <Text style={[styles.btnText, styles.btnPrimaryText]}>
            เปลี่ยนสถานะ
          </Text>
        </Pressable>

        <Text style={styles.metaText}>
          สร้างเมื่อ: {formatDateTime(header.createdAt)}
        </Text>
      </View>

      {/* Loop รายการอาหาร */}
      {list.length > 0 ? (
        list.map((order) => {
          const imageURI = order.menuItemImage?.trim()
            ? { uri: order.menuItemImage }
            : undefined;

          return (
            <View style={styles.card} key={order.id}>
              <View style={styles.imageRow}>
                <View style={styles.imageWrap}>
                  {imageURI ? (
                    <Image source={imageURI} style={styles.image} />
                  ) : (
                    <View style={[styles.image, styles.imagePlaceholder]}>
                      <Text style={styles.imagePlaceholderText}>ภาพเมนู</Text>
                    </View>
                  )}
                  {order.isCancelled && (
                    <View style={styles.ribbon}>
                      <Text style={styles.ribbonText}>ยกเลิกแล้ว</Text>
                    </View>
                  )}
                </View>

                <View style={styles.headerInfo}>
                  <Text style={styles.title}>{order.menuItemName}</Text>
                  <View style={styles.badgeRow}>
                    <Badge label={`จำนวน ${order.quantity} ชิ้น`} />
                    {order.isCancelled ? (
                      <Badge label="สถานะ: ยกเลิก" tone="danger" />
                    ) : (
                      <Badge label="สถานะ: ปกติ" tone="primary" />
                    )}
                  </View>
                  <Text style={styles.metaText}>
                    แก้ไขล่าสุด: {formatDateTime(order.updatedAt)}
                  </Text>
                  {order.isCancelled && (
                    <Text style={[styles.metaText, { color: "#C0392B" }]}>
                      ยกเลิกเมื่อ: {formatDateTime(order.cancelledAt)}
                    </Text>
                  )}
                </View>
              </View>

              {/* Note */}
              {!!order.note?.trim() && (
                <View style={styles.noteBox}>
                  <Text style={styles.noteTitle}>หมายเหตุ</Text>
                  <Text style={styles.noteText}>{order.note}</Text>
                </View>
              )}

              {/* Options */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>ตัวเลือกที่เลือกไว้</Text>
                {order.orderDetailOptions?.length ? (
                  <View style={styles.optionWrap}>
                    {order.orderDetailOptions.map((opt, idx) => (
                      <OptionChip
                        key={`${opt.optionGroupName}-${opt.optionValueName}-${idx}`}
                        label={getOptionLabel(opt)}
                        qty={getOptionQty(opt)}
                        extra={getOptionExtra(opt)}
                      />
                    ))}
                  </View>
                ) : (
                  <Text style={styles.emptyOption}>ไม่มีตัวเลือกเพิ่มเติม</Text>
                )}
              </View>

              {/* ราคา */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>สรุปราคา</Text>
                <PriceRow
                  label={`ราคา ${formatCurrencyTHB(order.unitPrice)} × ${
                    order.quantity
                  }`}
                  value={order.unitPrice * order.quantity}
                />
                <PriceRow
                  label="เพิ่มเงินจากตัวเลือก"
                  value={order.extraPrice}
                />
                <Divider />
                <PriceRow
                  label="รวมของรายการนี้"
                  value={order.totalPrice}
                  emphasize
                />
              </View>
            </View>
          );
        })
      ) : (
        <View style={[styles.center, { padding: 24 }]}>
          <Text style={styles.emptyTitle}>ไม่มีรายการอาหารในออเดอร์นี้</Text>
        </View>
      )}

      {/* Footer รวมทั้งออเดอร์ */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>สรุปยอดรวมทั้งออเดอร์</Text>
        <PriceRow label="รวมทั้งหมด (ก่อนลด)" value={header.subTotal} />
        <PriceRow label="ส่วนลด" value={header.discount} />
        <Divider />
        <PriceRow label="ยอดสุทธิ" value={header.total} emphasize />
      </View>

      {/* Actions */}
      <View style={[styles.rowBetween, { gap: 12, marginBottom: 28 }]}>
        <Pressable
          style={[styles.btn, styles.btnGhost]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.btnText, styles.btnGhostText]}>ย้อนกลับ</Text>
        </Pressable>

        <Pressable
          style={[styles.btn, styles.btnPrimary]}
          onPress={() => {
            setDiscountValue(String(header.discount ?? 0));
            setShowDiscountModal(true);
          }}
        >
          <Text style={[styles.btnText, styles.btnPrimaryText]}>
            แก้ไขส่วนลด
          </Text>
        </Pressable>
      </View>

      {/* Modal แก้ไขส่วนลด */}
      <Modal visible={showDiscountModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.sectionTitle}>แก้ไขส่วนลด</Text>
            <TextInput
              value={discountValue}
              onChangeText={setDiscountValue}
              keyboardType="numeric"
              style={styles.input}
            />
            <View style={[styles.rowBetween, { marginTop: 16 }]}>
              <Pressable
                style={[styles.btn, styles.btnGhost]}
                onPress={() => setShowDiscountModal(false)}
              >
                <Text style={[styles.btnText, styles.btnGhostText]}>
                  ยกเลิก
                </Text>
              </Pressable>
              <Pressable
                style={[styles.btn, styles.btnPrimary]}
                onPress={async () => {
                  await updateOrder({
                    id: header.id,
                    data: { ...header, discount: Number(discountValue) },
                  });
                  setShowDiscountModal(false);
                  refetch();
                }}
                disabled={isUpdating}
              >
                <Text style={[styles.btnText, styles.btnPrimaryText]}>
                  {isUpdating ? "กำลังบันทึก..." : "บันทึก"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal เปลี่ยนสถานะ */}
      <Modal visible={showStatusModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.sectionTitle}>เลือกสถานะใหม่</Text>

            {Object.values(SD_OrderStatus).map((st) => {
              const meta = getStatusMeta(st);
              return (
                <Pressable
                  key={st}
                  style={[
                    styles.statusButton,
                    {
                      backgroundColor: meta.color,
                      marginTop: 10,
                      flexDirection: "row",
                    },
                  ]}
                  onPress={async () => {
                    await updateOrderStatus({ id: header.id, newStatus: st });
                    setShowStatusModal(false);
                    refetch();
                  }}
                  disabled={isUpdatingStatus}
                >
                  <Text style={styles.statusButtonText}>{meta.icon}</Text>
                  <Text style={[styles.statusButtonText, { marginLeft: 8 }]}>
                    {meta.label}
                  </Text>
                </Pressable>
              );
            })}

            <Pressable
              style={[styles.btn, styles.btnGhost, { marginTop: 16 }]}
              onPress={() => setShowStatusModal(false)}
            >
              <Text style={[styles.btnText, styles.btnGhostText]}>ปิด</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default OrderDetails;

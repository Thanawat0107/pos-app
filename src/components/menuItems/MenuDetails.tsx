import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { styles } from "./MenuDetails.Style";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigators/navigation";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { COLORS } from "../../helpers/themes";
import { useGetMenuByIdQuery } from "../../services/menuItemApi";
import Loading from "../Loading";
import Error from "../Error";
import ReusableDialog from "../ReusableDialog";

type MenuDetailsRouteProp = RouteProp<RootStackParamList, "MenuDetails">;

const MenuDetails = () => {
  const route = useRoute<MenuDetailsRouteProp>();
  const { menuId } = route.params;
  const navigation = useAppNavigation();

  const { data: menu, isLoading, isError } = useGetMenuByIdQuery(menuId);

  const [selectedOptions, setSelectedOptions] = useState<{
    [optionId: number]: number[];
  }>({});
  const [count, setCount] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSelectOption = (
    optionId: number,
    detailId: number,
    isMultiple: boolean
  ) => {
    setSelectedOptions((prev) => {
      const prevSelections = prev[optionId] || [];

      if (isMultiple) {
        // ถ้าเลือกซ้ำ → เอาออก
        if (prevSelections.includes(detailId)) {
          return {
            ...prev,
            [optionId]: prevSelections.filter((id) => id !== detailId),
          };
        } else {
          // เพิ่มเข้าไป
          return {
            ...prev,
            [optionId]: [...prevSelections, detailId],
          };
        }
      } else {
        // ถ้าไม่ multiple → toggle ตัวเดียว
        return {
          ...prev,
          [optionId]: prevSelections[0] === detailId ? [] : [detailId],
        };
      }
    });
  };

  const getTotalPrice = () => {
    let total = menu?.basePrice ?? 0;

    for (const option of menu?.menuItemOptions ?? []) {
      const selectedIds = selectedOptions[option.id] || [];

      for (const id of selectedIds) {
        const detail = option.menuOptionDetails.find((d) => d.id === id);
        if (detail) {
          total += detail.extraPrice;
        }
      }
    }

    return total * count;
  };

  const validateRequiredOptions = () => {
    for (const option of menu?.menuItemOptions ?? []) {
      const selected = selectedOptions[option.id];
      if (option.isRequired && (!selected || selected.length === 0)) {
        return `กรุณาเลือก: ${option.name}`;
      }
    }
    return null;
  };

  const handleAddToCart = () => {
    const error = validateRequiredOptions();

    if (error) {
      setModalMessage(error);
      setModalVisible(true);
      return;
    }

    // TODO: ส่งข้อมูลไป Redux/cart หรือ API
    setModalMessage("เพิ่มลงตะกร้าเรียบร้อยแล้ว!");
    setModalVisible(true);
  };

  if (isLoading) return <Loading />;
  if (isError || !menu) return <Error />;

  return (
    <ScrollView style={styles.container}>
      {/* Top icons */}
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-social-outline" size={28} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image */}
      <View style={styles.imageWepper}>
        <Image
          source={{ uri: `${menu.imageUrl}` }}
          style={styles.productImage}
        />
      </View>

      <View style={styles.contentContainer}>
        {/* Title + Price */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{menu.name}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>฿ {menu.basePrice.toFixed(2)}</Text>
          </View>
        </View>

        {/* Rating + Quantity */}
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            <Ionicons name="star" size={20} color="gold" />
            <Ionicons name="star" size={20} color="gold" />
            <Ionicons name="star" size={20} color="gold" />
            <Ionicons name="star-half" size={20} color="gold" />
            <Ionicons name="star-outline" size={20} color="gold" />
            <Text style={styles.ratingText}>(3.5)</Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={decrement}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{count}</Text>
            <TouchableOpacity onPress={increment}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Options */}
        {menu.menuItemOptions?.map((option) => (
          <View key={option.id} style={styles.optionSection}>
            <Text style={styles.optionTitle}>
              {option.name} {option.isRequired ? "(ต้องเลือก)" : ""}
            </Text>

            {option.menuOptionDetails?.map((detail) => {
              const selectedIds = selectedOptions[option.id] || [];
              const isSelected = selectedIds.includes(detail.id);

              return (
                <TouchableOpacity
                  key={detail.id}
                  style={[
                    styles.optionDetail,
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      marginVertical: 5,
                      borderRadius: 10,
                      backgroundColor: isSelected
                        ? COLORS.red_orange
                        : COLORS.light_red,
                    },
                  ]}
                  onPress={() =>
                    handleSelectOption(option.id, detail.id, option.isMultiple)
                  }
                >
                  <Text
                    style={[
                      styles.optionDetailText,
                      { color: isSelected ? COLORS.lightWhite : COLORS.black },
                    ]}
                  >
                    {detail.name}{" "}
                    {detail.extraPrice > 0 ? `(+${detail.extraPrice}฿)` : ""}
                  </Text>

                  <Ionicons
                    name={isSelected ? "checkbox" : "square-outline"}
                    size={22}
                    color={isSelected ? COLORS.lightWhite : COLORS.gray}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        {/* Description */}
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>คำอธิบาย</Text>
          <Text style={styles.descText}>{menu.description}</Text>
        </View>

        {/* Bottom Cart Row */}
        <View style={styles.cartRow}>
          <TouchableOpacity onPress={handleAddToCart} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>Add to cart</Text>
          </TouchableOpacity>

          <View style={styles.addCart}>
            <Text style={{ color: "white", fontFamily: "medium" }}>
              ฿ {getTotalPrice().toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <ReusableDialog
        visible={isModalVisible}
        message={modalMessage}
        status="success"
        title="สำเร็จ"
        showCancelButton={false}
        rightButtonText="ปิด"
        onConfirm={() => setModalVisible(false)}
        onDismiss={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

export default MenuDetails;

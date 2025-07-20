import React from "react";
import { Dialog, Portal, Text, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import { COLORS } from "../helpers/themes";

type DialogStatus = "success" | "error" | "warning" | "info";

interface ReusableDialogProps {
  visible: boolean;
  title?: string;
  message: string;
  status?: DialogStatus;
  leftButtonText?: string;
  rightButtonText?: string;
  leftButtonColor?: string;
  rightButtonColor?: string;
  showCancelButton?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  onDismiss?: () => void;
}

const iconMap = {
  success: <AntDesign name="checkcircle" size={28} color={COLORS.green} />,
  error: <MaterialIcons name="error" size={28} color={COLORS.red2}/>,
  warning: <Feather name="alert-triangle" size={28} color={COLORS.yellew} />,
  info: <Feather name="info" size={28} color={COLORS.blue} />,
};

const iconColorMap = {
  success: COLORS.green,
  error: COLORS.red2,
  warning: COLORS.yellew,
  info: COLORS.blue,
} as const;

const ReusableDialog = ({
  visible,
  title = "แจ้งเตือน",
  message,
  status = "info",
  rightButtonText = "ตกลง",
  leftButtonText = "ยกเลิก",
  leftButtonColor = "#7f8c8d",
  rightButtonColor = "",
  showCancelButton = false,
  onConfirm,
  onCancel,
  onDismiss,
}: ReusableDialogProps) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss || onCancel || onConfirm}
        style={styles.dialogContainer}
      >
        <View style={styles.titleWrapper}>
          <View style={styles.icon}>{iconMap[status]}</View>
          <Text style={styles.titleText}>{title}</Text>
        </View>

        <Dialog.Content style={styles.contentWrapper}>
          <Text style={styles.message}>{message}</Text>
        </Dialog.Content>

        <View style={styles.actions}>
          {showCancelButton && (
            <>
              <View style={styles.actionButton}>
                <Button
                  onPress={onCancel}
                  textColor={leftButtonColor}
                  labelStyle={styles.leftButtonText}
                >
                  {leftButtonText}
                </Button>
              </View>
              <View style={styles.divider} />
            </>
          )}
          <View style={styles.actionButton}>
            <Button
              onPress={onConfirm}
              textColor={rightButtonColor || iconColorMap[status]}
              labelStyle={styles.rightButtonText}
            >
              {rightButtonText}
            </Button>
          </View>
        </View>
      </Dialog>
    </Portal>
  );
};

export default ReusableDialog;

const styles = StyleSheet.create({
  dialogContainer: {
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    gap: 8,
  },
  icon: {
    marginRight: 6,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  message: {
    fontSize: 16,
    color: "#2c3e50",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 4,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  actions: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderColor: "#d4d6d6ff",
    height: 50,
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: 0.5,
    backgroundColor: "#d4d6d6ff",
  },
  leftButtonText: {
    fontSize: 16,
  },
  rightButtonText: {
    fontSize: 16,
  },
});
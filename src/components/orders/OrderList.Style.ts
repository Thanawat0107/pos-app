import { StyleSheet } from "react-native";
import { hp } from "../../helpers/common";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  centerCell: {
    justifyContent: "center",
    alignItems: "center",
  },
  
  centerText: {
    textAlign: "center",
  },
  
  // Header Section
  header: {
    marginTop: hp(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Summary Section
  summaryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  
  summaryLabel: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  
  summaryValue: {
    fontSize: 16,
    color: '#1D1D1F',
    fontWeight: '700',
    textAlign: 'center',
  },

  revenueText: {
    color: '#34C759',
    fontSize: 14,
  },

  paidText: {
    color: '#007AFF',
  },

  pendingText: {
    color: '#FF9500',
  },

  // Page Info
  pageInfoContainer: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },

  pageInfo: {
    fontSize: 12,
    color: '#6D6D70',
    textAlign: 'center',
  },
  
  // Table Section
  tableContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  
  horizontalScroll: {
    flex: 1,
  },
  
  tableHeader: {
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E7',
  },
  
  headerCell: {
    paddingVertical: 16,
  },
  
  headerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1D1D1F',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    paddingVertical: 4,
  },
  
  evenRow: {
    backgroundColor: '#FFFFFF',
  },
  
  zebra: {
    backgroundColor: '#FAFAFA',
  },
  
  // Cell Content Styles
  cellText: {
    fontSize: 14,
    color: '#1D1D1F',
    minWidth: 0,
    lineHeight: 20,
  },
  
  idText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  
  codeText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#5856D6',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  tagText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
    backgroundColor: '#E3F2FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  // Customer Name
  customerContainer: {
    maxWidth: 130,
    alignItems: 'center',
  },

  customerText: {
    fontSize: 13,
    color: '#1D1D1F',
    fontWeight: '500',
  },
  
  moneyText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  
  totalText: {
    color: '#34C759',
    fontWeight: '700',
  },
  
  discountText: {
    color: '#FF9500',
  },
  
  dateText: {
    fontSize: 12,
    color: '#6D6D70',
    fontFamily: 'monospace',
  },
  
  // Status Badge
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Channel Badge
  channelText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Payment Icon
  paymentIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  paymentText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // Items Count
  itemsCountContainer: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 32,
    alignItems: 'center',
  },
  
  itemsCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  
  // Empty State
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  emptyText: {
    fontSize: 18,
    color: '#8E8E93',
    marginBottom: 8,
  },
  
  emptySubtext: {
    fontSize: 14,
    color: '#C7C7CC',
  },
  
  // Loading States
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8E8E93',
  },
  
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
  },
  
  retryButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  
  loadingOverlay: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.2)',
  },
  
  loadingOverlayText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  
  // Pagination
  paginationContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
  },
});
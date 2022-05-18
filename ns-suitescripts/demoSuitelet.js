function demoSuitelet() { 
    var invItem = nlapiCreateRecord('inventoryitem');
    invItem.setFieldValue('itemid', 'itemfordemo195');
    invItem.setFieldValue('displayname', 'Item for demo 195');
    invItem.setFieldValue('subsidiary', 3);
    var invItemInternalID = nlapiSubmitRecord(invItem);
    nlapiLogExecution('DEBUG', 'Inv Item ID', invItemInternalID);

    var nonInvItem = nlapiCreateRecord('noninventoryitem');
    nonInvItem.setFieldValue('itemid', 'itemfordemo19');
    nonInvItem.setFieldValue('displayname', 'Demo Item 19');
    nonInvItem.setFieldValue('subsidiary', 3);
    nonInvItem.setFieldValue('custitem_quantity_type', 5);
    nonInvItem.setFieldValue('custitem_item_category', 2);
    nonInvItem.setFieldValue('custitem_product_line', 3);
    nonInvItem.setFieldValue('taxschedule', 1);
    var nonInvItemInternalID = nlapiSubmitRecord(nonInvItem);
    nlapiLogExecution('DEBUG', 'Non Inv Item ID', nonInvItemInternalID);


    var invItemInventoryCostRev = nlapiCreateRecord('inventorycostrevaluation');
    invItemInventoryCostRev.setFieldValue('account', 64);
    invItemInventoryCostRev.setFieldValue('subsidiary', 3);
    invItemInventoryCostRev.setFieldValue('item', invItemInternalID);
    invItemInventoryCostRev.setFieldValue('location', 25);
    invItemInventoryCostRev.setLineItemValue('costcomponent', 'costcategory', 1, 3);
    invItemInventoryCostRev.setLineItemValue('costcomponent', 'cost', 1, 50);
    var invCostrevalID = nlapiSubmitRecord(invItemInventoryCostRev);
    nlapiLogExecution('DEBUG', 'Cost reval inv', invCostrevalID);

    var inventoryAdjustment = nlapiCreateRecord('inventoryadjustment');
    inventoryAdjustment.setFieldValue('subsidiary', 3);
    inventoryAdjustment.setFieldValue('account', 64);
    inventoryAdjustment.setLineItemValue('inventory', 'item', 1, invItemInternalID);
    inventoryAdjustment.setLineItemValue('inventory', 'location', 1, 25);
    inventoryAdjustment.setLineItemValue('inventory', 'adjustqtyby', 1, '10');
    inventoryAdjustment.setLineItemValue('inventory', 'avgunitcost', 1, '50');

    var invIteminvAdjID = nlapiSubmitRecord(inventoryAdjustment);
    nlapiLogExecution('DEBUG', 'Inv Adj Inv', invIteminvAdjID);

    var customer = nlapiCreateRecord('customer');
    customer.setFieldValue('isperson', 'T');
    customer.setFieldValue('firstname', 'demo');
    customer.setFieldValue('lastname', 'customer r78');
    customer.setFieldValue('subsidiary', 3);
    customer.setFieldValue('email', 'democustomer.r78@test.com');
    customer.setLineItemValue('addressbook', 'addr1', 1, 'demo r1234');
    customer.setLineItemValue('addressbook', 'city', 1, 'Hyderabad');
    customer.setLineItemValue('addressbook', 'country', 1, 'IN');
    customer.setLineItemValue('addressbook', 'state', 1, 'Telangana');
    customer.setLineItemValue('addressbook', 'zip', 1, '500035');
    var custInternalID = nlapiSubmitRecord(customer);
    nlapiLogExecution('DEBUG', 'customer ID', custInternalID);


    var salesOrder = nlapiCreateRecord('salesorder');
    salesOrder.setFieldValue('subsidiary', 3);
    salesOrder.setFieldValue('entity', custInternalID);
    salesOrder.setFieldValue('location', '25');
    salesOrder.setLineItemValue('item', 'item', 1, invItemInternalID);
    salesOrder.setLineItemValue('item', 'quantity', 1, '5');
    salesOrder.setLineItemValue('item', 'rate', 1, '50');
    salesOrder.setLineItemValue('item', 'item', 2, nonInvItemInternalID);
    salesOrder.setLineItemValue('item', 'quantity', 2, '5');
    salesOrder.setLineItemValue('item', 'rate', 2, '50');
    var SOID = nlapiSubmitRecord(salesOrder);
    nlapiLogExecution('DEBUG', 'Sales Order ID', SOID);

    var billRecord = nlapiTransformRecord('salesorder', SOID, 'invoice');
    var invoiceID = nlapiSubmitRecord(billRecord);
    nlapiLogExecution('DEBUG', 'Invoice ID', invoiceID);

    var fulfillRecord = nlapiTransformRecord('salesorder', SOID, 'itemfulfillment');
    fulfillRecord.setLineItemValue('item','location',1,25);
    fulfillRecord.setLineItemValue('item','location',2,25);
    var fulfillmentID = nlapiSubmitRecord(fulfillRecord);
    nlapiLogExecution('DEBUG', 'Fulfillment ID', fulfillmentID);


    var RMA = nlapiTransformRecord('salesorder', SOID, 'returnauthorization');
    RMA.setFieldValue('custbody_end_user', custInternalID);
    RMA.setFieldValue('custbody_order_type', '1');
    var RMA_ID = nlapiSubmitRecord(RMA);

    nlapiLogExecution('DEBUG', 'RMA ID', RMA_ID);

    var creditMemo = nlapiTransformRecord('returnauthorization', RMA_ID, 'creditmemo');
    var creditMemoID = nlapiSubmitRecord(creditMemo);

    nlapiLogExecution('DEBUG', 'Fulfillment ID', creditMemoID);

}

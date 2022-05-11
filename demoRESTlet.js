function getRecord(datain) {
    var results;
    var filters = [];
    var columns = [];
    filters[0] = new nlobjSearchFilter('email', null, 'is', "democustomer.r91@test.com");
    columns[0] = new nlobjSearchColumn('tranid');
    columns[1] = new nlobjSearchColumn('amount');
    columns[2] = new nlobjSearchColumn('status');

    var results = nlapiSearchRecord('salesorder', null, filters, columns);
    // return JSON.stringify(results);
    var salesOrderResults = [];
    for (var i = 0; results != null && i < results.length; i++) {
        var orderStatus = results[i].getValue(columns[2]);
        if (orderStatus == 'pendingBilling') {
            var orders = {};
            orders.docNumber = results[i].getValue(columns[0]);
            orders.amount = results[i].getValue(columns[1]);
            orders.status = results[i].getValue(columns[2]);
            salesOrderResults.push(orders);
        }

    }
    return JSON.stringify(salesOrderResults);
}
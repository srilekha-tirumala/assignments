function beforeLoad(type, form) {
    form.setScript('customscript919');
    form.addButton('custpage_script_testing', 'Script Testing', 'buttonClicked()');
    nlapiLogExecution('DEBUG', 'beforeLoad', 'type=' + type)
  }
  
  function buttonClicked() {
    var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
    record.setFieldValue('custentity1323', record.getFieldValue('companyname'));
  }
  
function afterSubmit(type) {
    if(nlapiGetRecordType() == 'salesorder'&& type == 'edit') {
        var salesOrderID = nlapiGetRecordId();
        var currentUser = nlapiGetContext();
        var userInternalID = currentUser.getUser();
        var recordFile = nlapiPrintRecord('transaction', salesOrderID, 'PDF');
        nlapiSendEmail(userInternalID, userInternalID, 'Sales Order', 'This is a test',null,null,null, recordFile);
    }
}
function beforeSubmit(type) {
    if (nlapiGetRecordType() == 'salesorder' && type == 'create') {
        var results;
        var filters = [];
        var columns = [];
        filters[0] = new nlobjSearchFilter('custrecord_cust_email_demo', null,'is','democustomer.r12@test.com');
        columns[0] = new nlobjSearchColumn('name');
        columns[1] = new nlobjSearchColumn('custrecord1509');
        columns[2] = new nlobjSearchColumn('custrecord_cust_email_demo');
        results = nlapiSearchRecord('customrecord986',null,filters,columns); 

        if (results != null) {
            nlapiLogExecution('ERROR', 'beforeSubmit', 'Email already exists');
        } 
        else {
            var custRecord = nlapiCreateRecord('customrecord986');
            custRecord.setFieldValue('name', 'test record');
            custRecord.setFieldValue('custrecord1509', 'INT1234');
            custRecord.setFieldValue('custrecord1510', 'TESTEXT3435');
            custRecord.setFieldValue('custrecord1511', 'Demo user 121');
            custRecord.setFieldValue('custrecord_cust_email_demo', 'democustomer.r12@test.com');
            var CustRecordID = nlapiSubmitRecord(custRecord);
            nlapiLogExecution('DEBUG', 'beforeSubmit', 'ID=' + CustRecordID);
        }
    }

}
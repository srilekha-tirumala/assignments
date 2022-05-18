function myFieldChanged(type, name)
{
   alert ('Record modified' );
   alert ('Field=' + name );
   if(name == 'phone') {
      var phone = nlapiGetFieldValue('phone');
      nlapiSetFieldValue('custentity1323', phone);
   }
   
}
function mySaveRecord()
{
   alert ('Record Saved');
   return true;
}
function myPageInit(type)
{
   alert ('Editing mode');
   alert ('type=' + type);
}

function myRecalc(type)
{
   alert ('myRecalc' );
   alert ('type=' + type);
}
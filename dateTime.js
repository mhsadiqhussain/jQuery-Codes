<link href="assets/jquery-ui/jquery-ui.min.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="assets/jquery-ui/jquery-ui.min.js"></script>
<script>
      
 $(document).ready(function(){   
      jQuery('#loading-image').hide();
      $("#date1,#date").attr("disabled", "disable");// add end date to disable

      $("#task_projid").on("change",function(){

           $("#date").removeAttr("disabled");

            var selectedVal= $("#task_projid option:selected" ).val();
            var saveData = $.ajax({
            type: 'GET',
            url: 'project_manager_list.php',
            data: {pro_id: selectedVal},
            dataType: "html",
            success: function(resultData) {
                    $( "#manager_list" ).html(resultData);
            }
        });
      });
 });

 function getProID()
 {
     var selectedProID=$("#task_projid option:selected").val();

     $.ajax({
         type: "POST",
         url: 'Task_Dates.php?' + new Date().getTime(),
         data: {proID: selectedProID},
         cache:false,
         dataType: "json",
         success: function(data)
         {
             var dateStart = data[0];
             var dateEnd = data[1];
             date_disable(dateStart,dateEnd);
         }
     });
 }

 function date_disable (dateStart,dateEnd) {
     
     $('#date').datepicker('destroy');
         $('#date').datepicker({
             dateFormat: 'dd/mm/yy',

             minDate: new Date(dateStart),
             maxDate: new Date(dateEnd),

             onSelect: function (dateStr) {
                 $("#date1").removeAttr("disabled");// remove disable after select startdate
                 $("#date1").datepicker("option","minDate", dateStr); // Set other min, default to today

                 function getBusinessDatesCount(startDate, endDate) {
                     var count = 0;
                     var curDate = startDate;
                     while (curDate <= endDate) {
                         var dayOfWeek = curDate.getDay();
                         if(!((dayOfWeek == 6) || (dayOfWeek == 0)))
                             count++;
                         curDate.setDate(curDate.getDate() + 1);
                     }
                     return count;
                 }

                 //Usage
                 var startDate = $("#date").datepicker("getDate");
                 var endDate = $("#date1").datepicker("getDate");
                 var numOfDates = getBusinessDatesCount(startDate,endDate);
                 $('#task_duration').val(numOfDates);
             }
         });

         $('#date1').datepicker('destroy');
         $('#date1').datepicker({
             dateFormat: 'dd/mm/yy',

             //minDate: new Date("'"+dateStart+"'"),
             minDate: 0,
             maxDate: new Date(dateEnd),

             onSelect: function (dateStr) {
                 $('#datepicker').datepicker("option","maxDate", dateStr); // Set other max, default to +18 months

                 function getBusinessDatesCount(startDate, endDate) {
                     var count = 0;
                     var curDate = startDate;
                     while (curDate <= endDate) {
                         var dayOfWeek = curDate.getDay();
                         if (!((dayOfWeek == 6) || (dayOfWeek == 0)))
                             count++;
                         curDate.setDate(curDate.getDate() + 1);
                     }
                     return count;
                 }

                 var startDate = $("#date").datepicker("getDate");
                 var endDate = $("#date1").datepicker("getDate");
                 var numOfDates = getBusinessDatesCount(startDate, endDate);
                 $('#task_duration').val(numOfDates);
             }
         });
 }

</script>

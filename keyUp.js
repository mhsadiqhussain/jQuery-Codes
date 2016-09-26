<link href="assets/jquery-ui/jquery-ui.min.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="assets/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="assets/js/jquery.min.js"></script>
<script>
    $(document).ready(function(){

        function calc(){
            var p1 = $("#p_m_salary").val();
            var p2 = $("#p_mat").val();
            var p3 = $("#p_tr").val();
            var p4 = $("#p_subc").val();
            var p5 = $("#p_overhead_c").val();
            var p6 = $("#p_emp_ben").val();
            var p7 = $("#p_GA_cos").val();

            var sum = Number(p1)+Number(p2)+Number(p3)+Number(p4)+Number(p5)+Number(p6)+Number(p7);
            $("#project_expense").val(sum);
        }
        //$(".key").keyup(function(){
        $(".key").on('paste change keyup keydown select click mousedown',function(){
            calc();
        });

        function diff() {
            var p8 = $("#p_exp").val();
            var p9 = $("#p_cos_est").val();
            var sub = Number(p9) - Number(p8);
            $("#p_pro").val(sub);
        }
        //$(".key2").keyup(function(){
        $(".key2").on('paste keyup keydown change select click mousedown',function(){
            diff();
        });

    });
</script>

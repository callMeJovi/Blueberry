<?php

    $username=$_POST["username"];
    $password=$_POST["password"];

    $con=mysqli_connect("localhost","root","","bberry");
    if($con){
        // mysqli_query($con);
        $sql="select * from bberrycommunity where username='$username' and password='$password'";
        $result = mysqli_query($con,$sql);
        if($result -> num_rows >0){
            $data=mysqli_fetch_all($result,MYSQLI_ASSOC);
            echo json_encode($data);
        }else{
            echo json_encode(array("msg"=>"username doesn't exist"));
        }
    }else{
        echo json_encode(array("msg"=>"Connection to database failed"));
    }


?>
<?php

    $username=$_POST["username"];
    $password=$_POST["password"];

    $con=mysqli_connect("localhost","root","","bberry");
    if($con){
        // mysqli_query($con,"set names uft8");
        $sql="insert into bberrycommunity values (null,'$username','$password')";
        $result=mysqli_query($con,$sql);
        if($result>0){
            echo json_encode(array("msg"=>"Sign up suceeded !"));
            
        }else{
            echo json_encode(array("msg"=>"sign up failed"));
        }
    }else{
        echo json_encode(array("msg"=>"Connection to database failed"));
    }


?>
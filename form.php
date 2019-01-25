<?php
session_start();

if(!$_SESSION["imgver_code"] || !$_POST["imgver_code"])
{
	echo "缺少参数";
	exit;
}
if($_SESSION["imgver_code"]!=$_POST["imgver_code"])
{
	echo "验证失败";
	exit;
}
else
{
	echo "提交成功";
	exit;
}
?>
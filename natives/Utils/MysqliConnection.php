<?php
require_once 'Config.php';

/**
* MysqliConnection
*/
class MysqliConnection
{
  private $connection;
  private $config;
  private $query = "";
  private $mysqliQuery;
  function __construct()
  {
    $config = new Config();

    $this->connection = new mysqli($config->MYSQLI_SERVER, $config->MYSQLI_USERNAME, $config->MYSQLI_PASSWORD, $config->MYSQLI_DB);
    $this->connection->set_charset("utf8");
    if ($this->connection->connect_error) {
      trigger_error('Database connection failed: '  . $this->connection->connect_error, E_USER_ERROR);
    }
  }

  function __destruct() {
    $this->connection->close();
    $this->connection = null;
  }

  public function EscapeString($value='')
  {
    return $this->connection->real_escape_string($value);
  }

  public function BeginQuery(){
    $this->query = "";
  }

  public function Select($value){
    $this->query .=" SELECT ".$value;
    return $this;
  }

  public function Delete(){
    $this->query .=" DELETE";
    return $this;
  }

  public function Update($value){
    $this->query .=" UPDATE ".$value;
    return $this;
  }

  public function InsertInto($value){
    $this->query .=" INSERT INTO ".$value;
    return $this;
  }

  public function From($value){
    $this->query .=" FROM ".$value;
    return $this;
  }

  public function Where($value){
    $this->query .= " WHERE ".$value;
    return $this;
  }

  public function Equals(){
    $this->query .= " = ";
    return $this;
  }

  public function To($value){
    $this->query .= "'".$value."'";
    return $this;
  }

  public function Set($arr){
    $this->query .= " SET";
    $i = 0;
    foreach ($arr as $key => $value) {
      if(is_numeric($value)){
        $this->query .= " ".$key."=".$value;
      }else{
        $this->query .= " ".$key."='".$value."'";
      }
      if($i+1 < count($arr)){
        $this->query .= ",";
      }
      $i+=1;
    }
    return $this;
  }

  public function OrderBy($what,$how){
    $this->query .= " ORDER BY ".$what." ".$how;
    return $this;
  }

  public function Values($arr){
    $values = " VALUES (";
    $keys = "(";
    $i = 0;
    foreach ($arr as $key => $value) {
      if(is_numeric($value)){
        $keys .= " ".$key;
        $values .= " ".$value;
      }else{
        $keys .= " ".$key;
        $values .= " '".$value."'";
      }
      if($i+1 < count($arr)){
        $keys .= ",";
        $values .= ",";
      }
      $i+=1;
    }
    $values .=")";
    $keys .= ")";
    $this->query .= $keys . $values;
    return $this;
  }

  public function ExecuteQuery(){
    $this->mysqliQuery = $this->connection->query($this->query);
    if(!$this->mysqliQuery){
      trigger_error('Database query failed: '  . $this->connection->error, E_USER_ERROR);
    }
  }

  public function GetResult(){
    return $this->mysqliQuery;
  }

  public function GetOutput(){
    return $this->mysqliQuery->fetch_assoc();
  }
}
?>

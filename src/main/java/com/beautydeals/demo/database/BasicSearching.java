package com.beautydeals.demo.database;

import java.sql.*;

public class BasicSearching {
    private static String tbl = "product_tbl";
    private static String drv = "com.mysql.cj.jdbc.Driver";
    private static String url = "jdbc:mysql://b6c467462f4954:38ab0380@us-cdbr-east-02.cleardb.com/heroku_7c76701c5a9944c?reconnect=true";
    private static String usr = "b6c467462f4954";
    private static String pwd = "38ab0380";

    public static void testConnection(){
        int productID = 740;

        String sql="select * from product_tbl where product_id =" + productID;
        try{
            Class.forName(drv);
            Connection conn = DriverManager.getConnection(url,usr,pwd);
            Statement stm = conn.createStatement();
            ResultSet rs = stm.executeQuery(sql);

            while(rs.next()){
                String discountPrice = rs.getString("discount_price");
                Date sellDate = rs.getDate("sell_date");
                String seller = rs.getString("seller");
                String dealDescription = rs.getString("deal_description");

                System.out.println(discountPrice + " " + sellDate  + " " +  seller  + " " +  dealDescription);
            }

            rs.close();
            stm.close();
            conn.close();

        }catch (Exception e) {
            e.printStackTrace();
            System.out.println(e);
        }
    }
}



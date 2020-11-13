package com.beautydeals.demo.database;

import java.sql.*;

public class BasicSearching {
    private static String tbl = "product_tbl";
    private static String drv = "com.mysql.cj.jdbc.Driver";
    private static String url = "jdbc:mysql://be8acc2b51678d:e04ba41b@us-cdbr-east-02.cleardb.com/heroku_be267ccbfffea9c?reconnect=true";
    private static String usr = "be8acc2b51678d";
    private static String pwd = "e04ba41b";

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



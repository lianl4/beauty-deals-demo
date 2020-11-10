package com.beautydeals.demo.database;

import java.sql.*;

public class BasicSearching {
    private static String drv = "com.mysql.cj.jdbc.Driver";
    private static String url = "jdbc:mysql://127.0.0.1:3306/BEAUTYDEALS";
    private static String usr = "root";
    private static String pwd = "Ydj13602138506";

    public static void testConnection(){
        int productID = 740;
        String productTable = productID + "_tbl";

        String sql="select * from " + productTable;
        try{
            Class.forName(drv);
            Connection conn = DriverManager.getConnection(url,usr,pwd);
            System.out.println("Connection Succeed");
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



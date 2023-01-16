import React from "react";
import QRCode from "react-native-qrcode-svg";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Header, Button } from "@rneui/base";
import { Input, Dialog } from "@rneui/themed";
import { useState, useEffect } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
const Scan = ({ navigation, route }) => {
    return (
        <SafeAreaView style={{ alignItems: "center", backgroundColor: "white", height: "100%" }}>
            <QRCodeScanner reactivate showMarker cameraStyle={{ width: "100%", height: "100%" }}
                onRead={(e) => {
                    console.log(e.data)
                }}
            />
        </SafeAreaView >

    )
}


const styles = StyleSheet.create({
    chuyenTienWrapper: {

    },
    chuyenTien: {
        width: "100%",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#66cc9a",
        borderRadius: 5,
        top: 10,
    },
    buttonMoney: {
        width: 100,
        height: 40,
        borderRadius: 10,
        backgroundColor: "grey",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    }
})
export default Scan

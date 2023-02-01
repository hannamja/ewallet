import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, PermissionsAndroid, Linking, AppState } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Header, Button } from "@rneui/base";
import { Input, Dialog } from "@rneui/themed";
import { useState, useEffect, useCallback, useRef } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";



const Scan = ({ navigation, route }) => {
    const [isActive, setActive] = useState(false)
    const [checkPermiss, setPermiss] = useState(false)

    const requestCameraPermission = async () => {
        // Open the custom settings if the app has one
        await Linking.openSettings()
    }

    useEffect(() => {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(response => { setPermiss(response) })
        AppState.addEventListener('change', nextAppState => {
            if (
                AppState.currentState.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(response => { setPermiss(response) })
            }

            AppState.currentState = nextAppState;

        });
        return () => console.log('rm')
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: "white", height: "100%", width: "100%" }}>
            {checkPermiss ? <QRCodeScanner ref={(node) => { this.scanner = node }} showMarker cameraStyle={{ width: "100%", height: "100%" }}
                onRead={(e) => {
                    setActive(true)
                }}

                topContent={
                    (
                        <View>
                            <Text>Đặt QR Code tại ví trí ô vuông để quét</Text>
                        </View>

                    )
                }
                bottomContent={
                    (
                        <View>
                            <TouchableOpacity
                                onPress={() => { this.scanner.reactivate() }}
                            >
                                <Text style={{ fontSize: 30, fontWeight: "bold" }}>Quét</Text>
                            </TouchableOpacity>
                        </View>

                    )
                }
                topViewStyle={{ opacity: 0.5, width: "100%", position: "absolute", top: 100, zIndex: 1000 }}
                bottomViewStyle={{ opacity: 0.5, width: "100%", position: "absolute", bottom: 100 }}
            /> : <QRCodeScanner key={Math.random()} ref={(node) => { this.scanner = node }} showMarker cameraStyle={{ width: "100%", height: "100%" }}
                onRead={(e) => {
                    console.log(this.a)
                    setActive(true)
                }}

                topContent={
                    (
                        <View>
                            <Text>Đặt QR Code tại ví trí ô vuông để quét</Text>
                        </View>

                    )
                }
                bottomContent={
                    (
                        <View>
                            <TouchableOpacity
                                onPress={requestCameraPermission}
                            >
                                <Text style={{ padding: 10, fontSize: 20, fontWeight: "bold", borderWidth: 1, borderColor: "blue", borderRadius: 10 }}>Cấp quyền sử dụng camera</Text>
                            </TouchableOpacity>
                        </View>

                    )
                }
                topViewStyle={{ opacity: 0.5, width: "100%", position: "absolute", top: 100, zIndex: 1000 }}
                bottomViewStyle={{ opacity: 0.5, width: "100%", position: "absolute", bottom: 100 }}
            />
            }


            <Dialog style={{
                borderRadius: 5
            }}
                isVisible={isActive}
                onBackdropPress={() => setActive(false)}
            >
                <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center", color: "black" }}>Nhập số tiền</Text>
                </View>

                <View>
                    <Input inputContainerStyle={styles.chuyenTien} keyboardType="numeric" placeholder="Số tiền" autoFocus>

                    </Input>
                </View>

                <View>
                    <Input inputContainerStyle={styles.chuyenTien} placeholder="Lời nhắn">

                    </Input>
                </View>

                <Dialog.Actions>
                    <Dialog.Button title="Xong">
                    </Dialog.Button>
                    <Dialog.Button title="Hủy" onPress={() => setActive(!isActive)}>
                    </Dialog.Button>
                </Dialog.Actions>
            </Dialog>
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

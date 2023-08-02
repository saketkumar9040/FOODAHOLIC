import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const UpdatingScreen = () => {
  return (
    <View
          style={{
            flex: 1,
            backgroundColor: "#ff4242",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={150} color="#fff" />
          <Text
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#fff",
              marginTop: 60,
            }}
          >
            PLEASE WAIT WHILE APP IS UPDATING...
          </Text>
        </View>
  )
}

export default UpdatingScreen

const styles = StyleSheet.create({})
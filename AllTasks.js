import React ,{useState} from 'react';
import { Button, Dimensions, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import {  useFocusEffect, useNavigation } from '@react-navigation/native';
import {Divider,List,ListItem,Text} from '@ui-kitten/components'
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function AllTasks() {
	const [ notes, setNotes ] = useState([])
	const navigation = useNavigation()

	useFocusEffect(
		React.useCallback(() => {
			getNotes()
		}, [])
	)

	const getNotes = () => {
		AsyncStorage.getItem("NOTES").then((notes) => {
			setNotes(JSON.parse(notes))
		})
	}

	const renderItem = ({ item, index }) => (
		<ListItem
			title={<Text category="h5">{item}</Text>}
			onPress={() =>
				navigation.navigate("Task", {
					singleNote: item
				})}
		/>
	)

	return (
		<View style={{ backgroundColor: "#222B45", flex: 1 }}>
			<Text style={styles.title} category="h1">
				Notes
			</Text>
			<List
				style={styles.container}
				data={notes.reverse()}
				ItemSeparatorComponent={Divider}
				renderItem={renderItem}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		fontSize: 20
	},

	item: {
		marginVertical: 4
	},
	title: {
		textAlign: "center",
		marginTop: 50
	},
	notes: {
		fontSize: 24
	}
})
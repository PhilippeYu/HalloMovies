import React, { Component } from 'react';
import { StyleSheet, 
	Text, 
	View,
	ScrollView,
	Button,
	Image,
	TouchableHighlight
	} from 'react-native';
	import App from './App';
import FicheFilm from './FicheFilm';

export default class ListFilm extends Component {
	constructor(){
		super();
		this.state = {
			list : null,
			renderApp : false,
			renderFicheFilm : true,
			index : null,
		}
	}
	componentDidMount(){
		let rand = Math.floor((Math.random() * 100) + 1);
		fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=27&api_key=fe92e01fc7f7de2e7bb39a4066baf3c3&page=${rand}`)
			.then(resp => resp.json())
			.then(resp => this.setState({ list : resp.results }))
	}
	handleClickRenderApp = () => {
		this.setState({renderApp : true})
	}
	handleClickRenderFicheFilm = (event) => {
		this.setState({renderFicheFilm : true})
		this.setState({index : event})
	}
	render(){
		if(this.state.list === null)
			return <Text>loading...</Text>
		//console.log("resp", this.state.list[0].title)
		if(this.state.renderApp === true)
			return <App />
		if(this.state.renderFicheFilm === true && this.state.index !== null)
			return <FicheFilm filmId={this.state.list[this.state.index].id}/>
		return(
			<ScrollView contentContainerStyle={styles.contentContainer}>
          		<View style={styles.container}>
            		<Text style={styles.textH} onPress={() => this.handleClickRenderApp()}>HalloMovies</Text>
					<View style={styles.container}>
					{this.state.list.map(
						(element, i) =>
							<View key={i} style={styles.container}>
								<Text style={styles.textTitleFilm}>{element.title}</Text>
								<TouchableHighlight onPress={() => this.handleClickRenderFicheFilm(i)}>
									<Image
										style={{width: 150, height: 220}}
										source={{uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${element.poster_path}`}}
									/>
								</TouchableHighlight>
							</View>
					)}
					</View>
          		</View>
      	</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	button: {
	  backgroundColor: '#DDDDDD',
	  padding: 10,
	},
	searchbar: {
	  padding: 20,
	  //backgroundColor: '#3399FF',
	  width: 300,
	  textAlign: "center",
	},
	contentContainer: {
		paddingVertical: 20,
	},
	textH: {
	  fontSize: 40,
	  fontWeight: 'bold',
	},
	textTitleFilm: {
		paddingVertical: 20,
		fontSize: 20,
		fontWeight: 'bold',
	}
});
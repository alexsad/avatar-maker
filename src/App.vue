<template>
	<header>
		<a class="logo" href="https://alexsad.github.io/avatar-maker/">
			<img alt="Site logo" src="./assets/gift-box-white.svg">
		</a>
		<h1>{{$translate('app.title')}}</h1>
	</header>
	<main>
		<PhotoMerge/>
	</main>
	<!-- <footer >
		<a href="https://github.com/alexsad/avatar-maker">github project</a>
	</footer> -->
</template>

<script lang="ts">
import PhotoMerge from './components/photo-merge/photo-merge.vue'

export default {
	components:{
		PhotoMerge,
	},
	methods: {
		hasUser(){
			const urlParams = new URLSearchParams(window.location.search);
			return urlParams.has('user');
		}
	},
}
</script>

<style lang="scss">
body, html{
	padding: 0;
	margin: 0;
	box-sizing:border-box;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	box-sizing:border-box;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 15vh 85vh;
	grid-template-areas:"header" "main";
	// grid-gap:16px;

	> header {
		background-color: #1e5959;
		color: #efefef;
		grid-area:header;
		position: relative;

		> a.logo{
			position: absolute;
			bottom: -16%;
			left: 16px;
			> img{
				width: 85px;
			}
		}

		> h1{
			margin: 0;
			position: absolute;
			top: 50%;
			width: 100%;
			text-align: center;
			transform: translateY(-50%);
		}
	}

	> main{
		width: 500px;
		margin: 0px auto;
		grid-area:main;
	}
	> footer{
		grid-area:footer;
		background-color: #1e5959;
		display: table;
		height: 100%;

		> a {
			display: table-cell;
			color: #efefef;
			width:100%;
			height: 100%;
			text-align: center;
			vertical-align: middle;
		}
	}
}
</style>

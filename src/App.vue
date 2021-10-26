<template>
	<header>
		<a class="logo" href="?reset2"></a>
		<div class="title">{{$translate('app.title')}}</div>
		<div class="empty"></div>
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
		background-color: #173f60;
		color: #efefef;
		grid-area:header;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: .1rem;

		> .empty{
			height: 55px;
			width: 55px;
		}

		> a.logo{
			height: 65px;
			width: 65px;
			background-image: url(./assets/logo-prototype-outline.svg);
			background-repeat: no-repeat;
			background-position: center center;
			background-size: cover;
		}

		> .title{
			text-align: center;
			font-size: 1.8rem;
			flex-grow: 1;
		}

	}

	> main{
		width: 500px;
		margin: 0px auto;
		grid-area:main;
	}
	> footer{
		grid-area:footer;
		background-color: #173f60;
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

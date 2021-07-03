<template lang='pug'>
.photo-merge
	div.upload-foto.btn.is-active {{$translate('app.upload')}}
		input.btn(type="file" @change="previewPhoto")
	p
		img(v-if="previewImage" :src="previewImage" width="400" height="400")
	p
		a.btn.is-active(v-if="previewImage" :download="photoName" :href="previewImage" title="download") {{$translate('app.download')}}
</template>

<script lang="ts">
import mergeImages from 'merge-images';

interface PhotoMerge {
	previewImage: string;
	photoName: string;
	avatarImage: string;
}

export default {
	data(){
		return {
			previewImage: '',
			photoName: '',
			avatarImage: require('./assets/guia-s21.png')
		}
	},
	methods: {
		previewPhoto(event: Event) {
			const target =  event.target as HTMLInputElement;
			const files = target.files;
			if(files && files.item(0)){
				const {avatarImage} = this as unknown as PhotoMerge;
				(this as unknown as PhotoMerge).photoName = `avatar-s21-${new Date().getTime()}.png`;

				mergeImages([
					{
						src: URL.createObjectURL(files.item(0)),
						x: 0,
						y: 0,
					},
					{
						src: avatarImage,
						x: 0,
						y: 0,
					},
				], {
					width: 600,
					height: 600,
					format: "png"
				})
				.then((b64) => (this as unknown as PhotoMerge).previewImage = b64);
			

			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.photo-merge{
		margin-bottom: 2px;

		>.upload-foto {
			position: relative;
			overflow: hidden;
			> input[type="file"] {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0;
			}
		}

		> p > img {
			border: 1px solid red;
			display: block;
			margin: 0px auto;
		}
		.btn{
			margin-top:16px;
			margin-bottom: 16px;
			text-align: center;
			border-width: 1px;
			border-style: solid;
			line-height: 1.5;
			transition: border-color 0.2s, background-color 0.2s, color 0.2s;
			padding: 0.5em 1em;
			outline: 0;
			min-width: 250px;
			font-size: 1.2rem;
			border-radius: 25px;
			color: #fff;
			background-color: purple;
			border-color: purple;
			opacity: .5;
			&.is-active {
				opacity: 1;
			}
		}
	}
</style>

<template lang='pug'>
.photo-merge
	div.upload-foto.btn.is-active {{$translate('app.upload')}}
		input.btn(type="file" @change="previewPhoto")
	p
		.preview-image(ref="previewBoxImage")
			.photo-bg-img(:class="photoOrientation" :style="{backgroundImage: 'url('+bgImg+')'}")
			.photo-img(:class="photoOrientation" :style="{backgroundImage: 'url('+photo+')'}")
			.avatar-logo(:style="{backgroundImage: 'url('+avatarImage+')'}")
	p
		a.btn.is-active(v-if="previewImage" :download="photoName" :href="previewImage" title="download") {{$translate('app.download')}}
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import {toPng} from 'html-to-image';

export default defineComponent({
	data(){
		return {
			previewImage: '',
			photoName: '',
			avatarImage: require('./assets/avatar-prototype.svg'),
			bgImg: '',
			photo: '',
			photoOrientation: '',
		}
	},
	methods: {
		previewPhoto(event: Event) {
			const {files} =  event.target as HTMLInputElement;

			if(files && files.item(0)){

				this.bgImg = URL.createObjectURL(files.item(0));
				this.photo = URL.createObjectURL(files.item(0));
				this.photoName = `avatar-s22-${new Date().getTime()}.png`;
				const tmpImage = new Image();

				tmpImage.onload = () => {
					// console.log(tmpImage.width, tmpImage.height);
					const {width, height} = tmpImage;

					if(height > width){
						this.photoOrientation = 'vertical';
					}else{
						this.photoOrientation = 'horizontal';
					}

					setTimeout(() => {
						const previewBoxImageRef = this.$refs.previewBoxImage as HTMLDivElement;
						toPng(previewBoxImageRef).then(dataUrl => {
							this.previewImage = dataUrl;
						});
					}, 4000);
				}

				tmpImage.src = URL.createObjectURL(files.item(0));
			}
		}
	}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.photo-merge{
		margin-bottom: 2px;

		>.upload-foto {
			position: relative;
			overflow: hidden;
			width: 50%;
			margin: 0px auto;
			cursor: pointer;

			> input[type="file"] {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0;
			}
		}

		> p
			> .preview-image {
				// border: 2px solid black;
				display: block;
				margin: 0px auto;
				height: 480px;
				width: 480px;
				position: relative;
				overflow: hidden;
				box-sizing: border-box;

				> .avatar-logo {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background-repeat: no-repeat;
					background-position: 95% 0%;
					background-size: 20% auto;
				}

				> .photo-img {
					position: absolute;
					left: 0;
					top: 0;
					height: 100%;
					width: 100%;
					background-repeat: no-repeat;
					background-position: center center;
					// box-shadow: 0px 0px 15px 3px #000000;

					&.vertical {
						background-size: auto 100%;
					}
					&.horizontal {
						background-size: 100% auto;
					}
				}

				> .photo-bg-img{
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					filter: blur(10px);
					background-repeat: no-repeat;
					background-size: cover;
					background-position: center center;
				}
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
			background-color: #1e5959;
			border-color: #1e5959;
			opacity: .5;
			&.is-active {
				opacity: 1;
			}
		}
	}
</style>

<template lang='pug'>
.photo-merge
	.photo-upload(v-if="!previewImage")
		.btn(v-if="isLoading")
			img(:src="loadinIcon")
		.upload-foto.btn.is-active(v-if="!previewImage && !isLoading") {{$translate('app.upload')}}
			input.btn(type="file" @change="previewPhoto")
	.photo-actions(v-if="previewImage")
		a.download-btn.btn.is-active(:download="photoName" :href="previewImage" title="download") {{$translate('app.download')}}
		a.reset-btn.btn.is-active(href="?reset" title="reset") {{$translate('app.reset')}}
	.preview-image(ref="previewBoxImage")
		.photo-bg-img(:class="photoOrientation" :style="{backgroundImage: 'url('+bgImg+')'}")
		.photo-img(:class="photoOrientation" :style="{backgroundImage: 'url('+photo+')'}")
		.avatar-logo(v-if="photoOrientation" :style="{backgroundImage: 'url('+avatarImage+')'}")
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import {toPng} from 'html-to-image';

export default defineComponent({
	data(){
		return {
			previewImage: '',
			photoName: '',
			avatarImage: require('./assets/goat-avatar-prototype.png'),
			loadinIcon: require('./assets/ajax-loader.gif'),
			bgImg: '',
			photo: '',
			photoOrientation: '',
			isLoading: false,
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

					this.isLoading = true;

					setTimeout(() => {
						const previewBoxImageRef = this.$refs.previewBoxImage as HTMLDivElement;
						toPng(previewBoxImageRef, {width: 500, height: 500, style:{
							position: 'absolute'
						}}).then(dataUrl => {
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

		> .photo-upload {
			display: flex;
			justify-content: center;
			padding: 1.6rem;

			> .upload-foto {
				position: relative;
				overflow: hidden;
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
		}

		> .photo-actions {
			display: flex;
			justify-content: space-between;
			padding: 1.6rem;
		}

		> .preview-image {
				// border: 1px solid black;
				background-color: #173f60;
				// display: block;
				// margin: 0px auto;
				height: 500px;
				width: 500px;
				position: relative;
				overflow: hidden;
				// box-sizing: border-box;

				> .avatar-logo {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background-repeat: no-repeat;
					background-position: 5% 6%;
					background-size: 22% auto;
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
		.btn {
			text-align: center;
			border-width: 1px;
			border-style: solid;
			line-height: 1.5;
			transition: border-color 0.2s, background-color 0.2s, color 0.2s;
			padding: 0.5em;
			outline: 0;
			font-size: 1.2rem;
			border-radius: 25px;
			color: #fff;
			background-color: #173f60;
			border-color: #173f60;
			opacity: .5;
			height: 25px;
			text-decoration: none;
			&.is-active {
				opacity: 1;
			}
		}

		.btn.reset-btn {
			background-color: #d0c221;
			color: black;
		}

	}
</style>

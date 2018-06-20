class Drawing {
	static drawAttackButton(ctx, text, rectX, rectY, rectWidth, rectHeight) {
		ctx.save();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#000000";
		ctx.fillStyle = "#abc";
		ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
		ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
		ctx.font = "20px Open Sans";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#000000";
		ctx.fillText(text, rectX + (rectWidth / 2), rectY + (rectHeight / 2));
		ctx.restore();
	}


	static drawEntitiesInfoImage(ctx, image, imageCenterX, imageCenterY, imageWidth, imageHeight) {
		ctx.save();
		ctx.beginPath();
		ctx.arc(imageCenterX, imageCenterY, Math.sqrt(imageWidth * imageWidth + imageHeight * imageHeight) / 2, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#ddd';
		ctx.stroke();
		ctx.clip();
		ctx.translate(imageCenterX, imageCenterY);
		ctx.drawImage(image, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight);
		ctx.restore();
	}


	static drawHealthBar(ctx, rectX, rectY, rectWidthCurrent, rectWidthMax, rectHeight, text, scaleX, scaleY, rightToLeft) {
		ctx.save();
		if (rightToLeft) {
			ctx.translate(ctx.canvas.width, 0);
		}
		ctx.scale(scaleX, scaleY);
		ctx.fillStyle = 'red';
		ctx.fillRect(rectX, rectY, rectWidthCurrent, rectHeight);
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#ddd';
		ctx.strokeRect(rectX, rectY, rectWidthMax, rectHeight);

		ctx.scale(scaleX, scaleY);
		ctx.font = "bold 18px Open Sans";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#ddd";
		let rightToLeftRatio = 1;
		if (rightToLeft) {
			rightToLeftRatio = -1;
		}
		ctx.fillText(text, rightToLeftRatio * (rectX + (rectWidthMax / 2)), rectY + (rectHeight / 2));
		ctx.restore();
	}


	static drawEntityName(ctx, text, textPositionX, textPositionY, rightToLeft) {
		ctx.save();
		ctx.font = "20px Open Sans";
		ctx.textBaseline = "top";
		if (rightToLeft) {
			ctx.textAlign = "right";
		}
		ctx.fillStyle = "yellow";
		ctx.fillText(text, textPositionX, textPositionY);
		ctx.restore();
	}


	static drawLevelResult(ctx, text, textPositionX, textPositionY) {
		ctx.save();
		ctx.font = "50px Open Sans";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.fillStyle = "red";
		ctx.fillText(text, textPositionX, textPositionY);
		ctx.restore();
	}
}

export default Drawing;
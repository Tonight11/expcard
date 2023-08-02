const { src, dest } = require('gulp');
const sprite = require('gulp-svg-sprite');

module.exports = function svg_sprite() {
	return src('src/svg/*.svg')
		.pipe(
			sprite({
				mode: {
					stack: {
						sprite: '../sprite.svg',
					},
				},
			})
		)
		.pipe(dest('src/img'));
};

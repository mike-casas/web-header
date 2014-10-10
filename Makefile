example: build
	@node_modules/.bin/serve --exec "make build"

build: components index.js
	@component build --dev --use component-stylus,component-jade

components: component.json
	@component install --dev

clean:
	rm -fr build components

.PHONY: clean example

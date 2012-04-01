SRC = wall.js
TEMP = w.temp.js
COMPRESS = w.min.js
SRCS = jquery.mix.js w.min.js
COMBINE = w.js
 
$(TEMP) : $(SRC)
	cat $^ > $@

	java -jar /Applications/gcc/compiler.jar --js $(TEMP) --js_output_file $(COMPRESS)
	rm -f $(TEMP)
	cat $(SRCS) > $(COMBINE)
	rm -f $(COMPRESS)


.PHONY: clean
clean :
	rm -f $(COMBINE) $(COMPRESS)



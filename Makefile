SRC = wall.js
TEMP = w.temp.js
COMPRESS = w.min.js
SRCS = w.min.js
COMBINE = w.js
 
$(TEMP) : $(SRC)
	cat $^ > $@

	growlnotify -t 'auto-make' -m 'make start.'
	((java -jar /Applications/gcc/compiler.jar --js $(TEMP) --js_output_file $(COMPRESS)) && growlnotify -t 'auto-make' -m 'make complete.') || growlnotify -t 'auto-make' -m 'make error.'
	rm -f $(TEMP)
	cat $(SRCS) > $(COMBINE)
	rm -f $(COMPRESS)


.PHONY: clean
clean :
	rm -f $(COMBINE) $(COMPRESS)



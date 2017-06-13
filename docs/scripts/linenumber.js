(function (w) {
	'use strict';

	if (typeof w.hljs === 'undefined') {
		console.error('highlight.js not detected!');
	} else {
		w.hljs.initLineNumbersOnLoad = initLineNumbersOnLoad;
		w.hljs.lineNumbersBlock = lineNumbersBlock;
	}

	function initLineNumbersOnLoad () {
		if (document.readyState === 'complete') {
			documentReady();
		} else {
			w.addEventListener('DOMContentLoaded', documentReady);
		}
	}

	function documentReady () {
		try {
			var blocks = document.querySelectorAll('code.hljs');

			for (var i in blocks) {
				if (blocks.hasOwnProperty(i)) {
					lineNumbersBlock(blocks[i]);
				}
			}
		} catch (e) {
			console.error('LineNumbers error: ', e);
		}
	}

  function selectActive(){
    var anchorHash = document.location.hash.substring(1)
    document.getElementById(anchorHash)
      .className = 'selected'
  }

	function lineNumbersBlock (element) {
		if (typeof element !== 'object') return;

		var parent = element.parentNode;
		var lines = getCountLines(parent.textContent);

		if (lines > 1) {
			var l = '<ul>';
			for (var i = 1; i < lines+1; i++) {
				l += '<li class="linenum-item" id="line'+i+'"><a href="#line'+i+'">' + i + '</a></li>';
			}
      l+= '</ul>'

			var linesPanel = document.createElement('code');
			linesPanel.className = 'hljs hljs-line-numbers';
			linesPanel.style.float = 'left';
			linesPanel.innerHTML = l;
      document.getElementsByClassName('linenum-item')
        .forEach(function(e){
          e.addEventListener("click", function(event){
            event.preventDefault();
            document.location.hash=e.id
          })
      })
			parent.insertBefore(linesPanel, element);
      selectActive()
		}
	}

	function getCountLines(text) {
		if (text.length === 0) return 0;

		var regExp = /\r\n|\r|\n/g;
		var lines = text.match(regExp);
		lines = lines ? lines.length : 0;

		if (!text[text.length - 1].match(regExp)) {
			lines += 1;
		}

		return lines;
	}
}(window));

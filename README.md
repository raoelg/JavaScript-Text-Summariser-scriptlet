# JavaScript-Text-Summariser-bookmarklet
Don't have time to read a lengthy New York Times article? Want to get the gist quickly? This scriptlet summarizes any selected text on a page. The approach is computing a sentence-wise TFIDF from which a sentence importance score is computed. The most important sentences are retained. By changing the strength of summarization you can 'zoom in' and 'zoom out' from the details from the text.

I’ve wanted for a long time a simple text summarizer that you can run on any web page. I made one in JavaScript.

To “install” it on a browser, copy the script code, go to http://jscompress.com where you paste the code and compress it with the ‘ECMAScript 2019’ checked. Copy the minified code, make a shortcut on the bookmarks bar (name it ‘summarizer’ for example), edit the bookmark’s url to `javascript:`  and paste the minified code directly after it. Save, and it should work: If you select a text on a website and click the ‘summarizer’ bookmark, a slider and a white text box should appear. As soon as you move the slider, the summarized text should appear in the white text box. Depending on your browser, you should be able to resize the white text box as desired.

## Technique

This script does what is sometimes described as 'extractive summarization'. A description of the technique behind this is given by [Praveen Dubey](https://towardsdatascience.com/understand-text-summarization-and-create-your-own-summarizer-in-python-b26a9f09fc70) for example. This script is much simpler---it doesn't use pagerank nor stopwords---and runs in the browser and does practically the same thing as the code presented by Praveen. For readability, the first sentence is always retained.

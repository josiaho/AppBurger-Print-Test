var genPDF = function(printerName) {
	// Create PDF with jsPDF in webview
	var doc = new jsPDF();
	doc.text('Hello Printer', 10, 10);
	var pdf = doc.output();
	// Send generated PDF to bridge
	Burger.printPDF(printerName, pdf);
};

window.addEventListener('load', function(){
    
	Burger.setStatusBarIcon('img/statusBarIcon.png', 'img/statusBarIconActive.png');
    Burger.centerWindow();
	Burger.setStatusBarLabel('');
	
	// Get Printer Names
    document.getElementById('getPrinters').onclick = function (){
       
	   var printers = Burger.getPrinters(), html = '';
       for (var i = 0; i < printers.length; i++) {
            var description = JSON.stringify(Burger.getPrinterDescription(printers[i]));
			html += '<button data-id="'+printers[i]+'">'+printers[i]+'</button>';
       }
	   document.getElementById('printers').innerHTML = html;
	   
	   setTimeout(function () {
	   		var p = document.getElementById('printers').getElementsByTagName('button');
	   		for (var i = 0; i < p.length; i++) {
		   		p[i].onclick = function () {
		   			var printerName = this.getAttribute('data-id');
		   			document.getElementById('data').innerHTML = Burger.getPrinterDescription(printerName);
		   			
		   			document.getElementById('print').innerHTML = '<button onclick="genPDF(\''+printerName+'\')">Print PDF</button>';
		   		}
		   	}
	   }, 100);
    };
	
}, false);

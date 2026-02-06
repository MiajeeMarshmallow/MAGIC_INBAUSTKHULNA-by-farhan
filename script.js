// লোগো আপলোড হ্যান্ডলিং
document.getElementById('logoInput').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = () => {
        const preview = document.getElementById('preview-logo');
        preview.src = reader.result;
        preview.style.display = 'block';
    }
    reader.readAsDataURL(e.target.files[0]);
});

// রিপোর্ট টাইপ অনুযায়ী লেবেল চেঞ্জ
function handleTypeChange() {
    const type = document.getElementById('reportType').value;
    document.getElementById('outType').innerText = type;
    const labelNo = document.getElementById('labelNo');
    const labelTopic = document.getElementById('labelTopic');
    const labelDate1 = document.getElementById('labelDate1');

    if (type === 'LAB REPORT') {
        labelNo.innerText = 'Lab no.';
        labelTopic.innerText = 'Experiment Name';
        labelDate1.innerText = 'Date of Experiment';
    } else {
        labelNo.innerText = 'Assignment no.';
        labelTopic.innerText = 'Topic Name';
        labelDate1.innerText = 'Date of Assignment';
    }
    update();
}

// ইনপুট ডাটা আউটপুটে পাঠানো
function update() {
    const ids = ['inDept', 'inCName', 'inCCode', 'inANo', 'inAName', 'inDate1', 'inDate2', 'inSN', 'inSI', 'inSD', 'inTN', 'inTDes', 'inTD'];
    ids.forEach(id => {
        const out = document.getElementById(id.replace('in', 'out'));
        if (out) out.innerText = document.getElementById(id).value;
    });
}

// সিঙ্গেল পেজ PDF জেনারেটর (মেইন ফিক্স)
function downloadPDF() {
    const element = document.getElementById('cover-page');
    const opt = {
        margin: 0,
        filename: 'BAUST_Cover_Page.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true, y: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
        // যদি ভুল করেও ২য় পেজ আসে, তবে তা ডিলিট হয়ে যাবে
        var totalPages = pdf.internal.getNumberOfPages();
        if (totalPages > 1) {
            for (var i = totalPages; i > 1; i--) {
                pdf.deletePage(i);
            }
        }
    }).save();
}

window.onload = update;
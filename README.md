# highland-hall-pass

Tired of writing Hall Passes? This system will:
1. Allow a student to input their Name, Destination, and requested time
2. You as the teacher to authenticate and "sign" the pass using a QR code

The system is not perfect, but I wanted something that worked without collecting storing, or pre-loading any data. Here is how it is implemented:
- Create a QR code that links to form.html
- Create another QR code that simply stores your full name
- A student will scan the first QR code to access the Hall Pass Form and fill it out.
- They will come to you with the request, and if approved, they can scan your private QR code and leave the classroom.

As time progresses, the background color of the pass will change to give a general sense of remaining time. A red pass indicates that it has expired.
All data is passed between pages using URL Search Parameters, so there is no storage of the data. It also allows the data to persist if the page gets reloaded or the tab is closed and re-opened. It could theoretically be spoofed by a clever student who knows how to manipulate them in the URL, but I doubt many will understand.

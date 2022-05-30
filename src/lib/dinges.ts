export let _ = null;


    // function handleFileInput(e) {
    //     console.info("fileinput");

    //     if (!filePreviewUrls[e.target.id]) {
    //         filePreviewUrls[e.target.id] = [];
    //     }

    //     while (filePreviewUrls[e.target.id].length) {
    //         URL.revokeObjectURL(filePreviewUrls[e.target.id][0]);
    //         filePreviewUrls[e.target.id].splice(0, 1);
    //         console.info(
    //             "Unloaded some object url before showing preview images"
    //         );
    //     }

    //     for (let i = 0; i < theActualFiles.length; i++) {
    //         let urll = URL.createObjectURL(theActualFiles[i]);
    //         filePreviewUrls[e.target.id].push(urll);
    //         let img = new Image();
    //         img.addEventListener("load", (e) => {
    //             pfpImg = img;
    //             doTheDrawingJwz();
    //         });
    //         img.src = urll;
    //         // let newImgElement = document.createElement("img");
    //         // newImgElement.addEventListener("load", f => {
    //         //     checkFileInputValidity(e.target);
    //         // });
    //         // newImgElement.src = urll;
    //         // newImgElement.draggable = false;
    //         // newImgElement.setAttribute("original-filename", theActualFiles[i].name);
    //     }
    //     //checkFileInputValidity(e.target);
    // }
    // function checkFileInputValidity(input) {
    //     let btn = document.querySelector(
    //         "#" + input.getAttribute("next-button-id")
    //     );
    //     let totalImagesOk = Array.from(
    //         document.querySelectorAll(
    //             "#" +
    //                 input.getAttribute("preview-grid-id") +
    //                 " img[original-filename]"
    //         )
    //     ).filter((ele) => isImageOk(ele)).length;
    //     if (theActualFiles.length && totalImagesOk == theActualFiles.length) {
    //         btn.style.background = "";
    //         btn.removeAttribute("disabled");
    //     } else {
    //         if (theActualFiles.length) {
    //             btn.style.background =
    //                 "linear-gradient(90deg, var(--theme-color) " +
    //                 (totalImagesOk / theActualFiles.length) * 100 +
    //                 "%, transparent " +
    //                 (totalImagesOk / theActualFiles.length) * 100 +
    //                 "%), linear-gradient(var(--button-bg), var(--button-bg))";
    //         }
    //         btn.setAttribute("disabled", "true");
    //     }
    // }
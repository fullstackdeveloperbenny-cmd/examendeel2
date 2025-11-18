// Import our custom CSS
import '../scss/styles.scss'
// Import all of Bootstrap’s JS
// -----------------------------------------
// Eindoefening — Rekenmachine (Windows-stijl)
// -----------------------------------------



async function loadPost() {
    const status = document.getElementById("ex3_status");
    const postCard = document.getElementById("ex3_post_card");
    const commentsCard = document.getElementById("ex3_comments_card");

    const titleEl = document.getElementById("ex3_title");
    const bodyEl = document.getElementById("ex3_body");

    const commentsList = document.getElementById("ex3_comments_list");
    const emptyComments = document.getElementById("ex3_comments_empty");

    const id = parseInt(document.getElementById("ex3_post_id").value);


    if (!id || id < 1) {
        status.className = "alert alert-warning mb-3";
        status.textContent = "⚠️ Gelieve een geldig ID in te vullen.";
        return;
    }

    try {
        // Loading melding
        status.className = "alert alert-warning mb-3";
        status.textContent = "⏳ Post en comments laden...";

        // Vorige content verbergen
        postCard.classList.add("d-none");
        commentsCard.classList.add("d-none");
        commentsList.innerHTML = "";
        emptyComments.classList.remove("d-none");

        // API calls parallel
        const postReq = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const commentsReq = fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);

        const [postRes, commentsRes] = await Promise.all([postReq, commentsReq]);

        if (!postRes.ok) throw new Error("Post niet gevonden");

        const post = await postRes.json();
        const comments = await commentsRes.json();

        // Post tonen
        titleEl.textContent = post.title;
        bodyEl.textContent = post.body;
        postCard.classList.remove("d-none");

        // Comments tonen
        if (comments.length > 0) {
            commentsList.innerHTML = comments
                .map(c => `
                    <li class="list-group-item">
                        <strong>${c.name}</strong><br>
                        <small class="text-muted">${c.email}</small><br>
                        ${c.body}
                    </li>
                `)
                .join("");

            emptyComments.classList.add("d-none");
        }

        commentsCard.classList.remove("d-none");

        // Succes
        status.className = "alert alert-success mb-3";
        status.textContent = "✓ Post en comments succesvol geladen";

    } catch (err) {
        status.className = "alert alert-danger mb-3";
        status.textContent = "❌ Fout bij het laden van de data";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ex3_btn")
        ?.addEventListener("click", loadPost);
});

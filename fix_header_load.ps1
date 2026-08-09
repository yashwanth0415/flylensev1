$files = @("index.html", "about.html", "blog1.html", "blogs.html", "contact.html", "education.html", "food.html", "industry.html", "jewellery.html", "portfolio.html", "service.html")
foreach ($file in $files) {
    $content = Get-Content "C:/xampp/htdocs/flylense/$file" -Raw
    
    $oldScript = '<script>document.getElementById("header-placeholder")?.outerHTML = ""; fetch("header.html").then(r => r.text()).then(html => { document.getElementById("header-placeholder").outerHTML = html; const scripts = document.querySelectorAll("#header-placeholder script"); scripts.forEach(s => { const ns = document.createElement("script"); if (s.src) ns.src = s.src; else ns.textContent = s.textContent; document.head.appendChild(ns); }); });</script>'
    
    $newScript = '<script>
        fetch("header.html").then(r => r.text()).then(html => {
            const placeholder = document.getElementById("header-placeholder");
            if (placeholder) {
                placeholder.outerHTML = html;
                const container = document.createElement("div");
                container.innerHTML = html;
                const scripts = container.querySelectorAll("script");
                scripts.forEach(s => {
                    const ns = document.createElement("script");
                    if (s.src) ns.src = s.src;
                    else ns.textContent = s.textContent;
                    document.head.appendChild(ns);
                });
            }
        });
    </script>'
    
    $content = $content -replace [regex]::Escape($oldScript), $newScript
    Set-Content "C:/xampp/htdocs/flylense/$file" $content
    Write-Host "Fixed $file"
}
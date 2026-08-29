# PowerShell Native Web Server for Photography Color Hunt
param(
    [int]$Port = 8080
)

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $Root) {
    $Root = (Get-Location).Path
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Prefixes.Add("http://127.0.0.1:$Port/")

try {
    $listener.Start()
    Write-Host "========================================================" -ForegroundColor Magenta
    Write-Host " PHOTOGRAPHY COLOR HUNT SERVER IS LIVE! " -ForegroundColor Green
    Write-Host " Local URL     : http://localhost:$Port/" -ForegroundColor Cyan
    Write-Host " Loopback URL  : http://127.0.0.1:$Port/" -ForegroundColor Cyan
    Write-Host " Serving Path  : $Root" -ForegroundColor Gray
    Write-Host "========================================================" -ForegroundColor Magenta
} catch {
    Write-Error "Failed to start listener: $_"
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8";
    ".htm"  = "text/html; charset=utf-8";
    ".css"  = "text/css; charset=utf-8";
    ".js"   = "application/javascript; charset=utf-8";
    ".json" = "application/json; charset=utf-8";
    ".png"  = "image/png";
    ".jpg"  = "image/jpeg";
    ".jpeg" = "image/jpeg";
    ".svg"  = "image/svg+xml";
    ".ico"  = "image/x-icon";
    ".pdf"  = "application/pdf"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }

        $cleanPath = $urlPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
        $targetFile = Join-Path $Root $cleanPath

        if (Test-Path $targetFile -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($targetFile).ToLower()
            $cType = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) {
                $cType = $mimeTypes[$ext]
            }

            $bytes = [System.IO.File]::ReadAllBytes($targetFile)
            $response.ContentType = $cType
            $response.ContentLength64 = $bytes.Length
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.StatusCode = 200
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentType = "text/plain"
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }

        $response.Close()
    } catch {
        # Catch and proceed
    }
}

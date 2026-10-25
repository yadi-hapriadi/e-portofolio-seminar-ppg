@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  start "E-Portofolio Localhost" /D "%~dp0" cmd /k py -3 -m http.server 8001
  timeout /t 2 /nobreak >nul
  start "" http://localhost:8001
  echo Server berjalan di http://localhost:8001
  echo Untuk menghentikan server, tekan Ctrl+C pada jendela "E-Portofolio Localhost".
  goto :end
)
where python >nul 2>nul
if %errorlevel%==0 (
  start "E-Portofolio Localhost" /D "%~dp0" cmd /k python -m http.server 8001
  timeout /t 2 /nobreak >nul
  start "" http://localhost:8001
  echo Server berjalan di http://localhost:8001
  echo Untuk menghentikan server, tekan Ctrl+C pada jendela "E-Portofolio Localhost".
  goto :end
)
echo Python 3 belum ditemukan.
echo Instal Python 3, lalu jalankan file ini kembali.
pause
:end
endlocal

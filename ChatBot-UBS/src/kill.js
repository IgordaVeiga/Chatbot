import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const lockfile = path.resolve('.wwebjs_auth', 'session', 'lockfile');

const psNode = "Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -match 'main\\.js' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force; Write-Output ('Encerrado PID ' + $_.ProcessId) }";
const psChrome = "Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'chrome.exe' -and $_.CommandLine -match 'wwebjs_auth' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force; Write-Output ('Chrome encerrado PID ' + $_.ProcessId) }";

const run = (script) => {
    try {
        const out = execFileSync('powershell.exe', ['-NoProfile', '-Command', script], { encoding: 'utf-8' });
        if (out.trim()) console.log(out.trim());
    } catch (err) {
        const out = String(err?.stdout || '');
        if (out.trim()) console.log(out.trim());
    }
};

run(psNode);
run(psChrome);

try {
    fs.rmSync(lockfile, { force: true });
    console.log('Lockfile de sessão removido (se existia).');
} catch (err) {
    console.error('Não foi possível remover o lockfile:', err.message);
}

console.log('✅ Ambiente limpo. Agora você pode rodar "npm start".');
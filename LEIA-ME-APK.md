# Vistoria Final de Obra — APK

O mesmo `index.html` serve a PWA (GitHub Pages) e a APK. Dentro da APK o código deteta que está numa app e liga as partes nativas; tudo o resto (Drive, pastas, JSON, fotografias, PDF) funciona exatamente como na PWA.

| | PWA | APK |
|---|---|---|
| Fotografia com a câmara | câmara do browser | câmara nativa; se o Android fechar a app a meio, a foto é recuperada ao reabrir |
| Login do Google Drive | redireciona para o Google, de hora a hora | login nativo; renova-se sozinho, sem ecrãs |
| PDF/JSON quando não há Drive | descarrega | abre a partilha do Android (guardar em Ficheiros, WhatsApp, e-mail…) |
| Botão "voltar" | do browser | fecha janelas abertas; na vistoria pede um 2.º toque para sair |
| Resto | igual | igual |

---

## 1. Google Cloud (uma vez, ≈ 5 min)

1. Abre <https://console.developers.google.com/auth/clients> e escolhe o **mesmo projeto da PWA** (o do Client ID que começa por `95430853177-`). Tem de ser o mesmo, senão a APK pode não ver as pastas criadas pela PWA.
2. **Create client** (Criar cliente) → tipo **Android** →
   - Nome: `Vistoria APK`
   - Nome do pacote: `pt.luvio.vistoria`
   - Impressão digital SHA-1: `BB:C7:AC:87:15:75:F4:2B:E5:D3:41:20:19:91:3F:CE:EF:29:5F:5F`
   - **Create**. Não é preciso copiar nenhum ID para a app.
3. Menu **Audience** (Público-alvo): se o estado for *Testing*, passa a *In production*. O âmbito `drive.file` não é sensível, por isso não deve pedir verificação. Em *Testing* a autorização caduca de 7 em 7 dias.
4. Menu **Data Access**: confirma que `.../auth/drive.file` está na lista (já está, porque a PWA usa-o).

## 2. GitHub (uma vez)

1. No repositório da PWA (`vistoria-final-obra`), carrega para a **raiz** todo o conteúdo desta pasta, substituindo o `index.html`:
   `index.html`, `package.json`, `package-lock.json`, `capacitor.config.json`, `.gitignore`, `LEIA-ME-APK.md` e as pastas `native/`, `scripts/` e `.github/`.
   Confirma que existe `.github/workflows/build-apk.yml` (pastas que começam por ponto ficam ocultas em alguns explorers).
   O novo `index.html` continua a funcionar na PWA exatamente como antes.
2. **Settings → Secrets and variables → Actions → New repository secret.** Cria os 4 segredos, com os valores do ficheiro `SEGREDOS-GITHUB.txt`:
   `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`.
3. Separador **Actions → Compilar APK → Run workflow.** A 1.ª compilação demora ≈ 10 min; as seguintes ≈ 4 min. Daí em diante compila sozinho sempre que alteras o `index.html`.
4. No fim, abre a execução: o resumo mostra o *SHA-1 do certificado* — tem de ser igual ao registado no passo 1.

## 3. Instalar no telemóvel

1. No repositório → **Releases → "APK mais recente"** → descarrega `Vistoria-Final-de-Obra.apk` (num repositório privado tens de estar com a sessão do GitHub iniciada no browser do telemóvel).
2. Abre o ficheiro. Se o Android pedir, autoriza "instalar apps desconhecidas" para o browser/Ficheiros. Se o Play Protect avisar, escolhe *Mais detalhes → Instalar mesmo assim*.
3. Abre a app → toca no indicador **Drive** → escolhe a **mesma conta Google da PWA** → autoriza. A partir daqui liga-se sozinha de cada vez.
4. Atualizações: instala o APK novo por cima do antigo (mantém os dados).

## 4. Testes a fazer (≈ 10 min)

1. **Drive:** o indicador fica "Drive ✓". Fecha a app e reabre: deve ficar ligado sem tocares em nada.
2. **Continuidade com a PWA:** inicia uma vistoria com o *mesmo código + morada* de uma já feita na PWA. Deve aparecer "Sessão carregada do Google Drive" e as fotografias. Se aparecer **"Pasta nova criada no Drive: …"**, a APK não está a ver as pastas da PWA (ver "Se algo correr mal").
3. **Câmara:** tira 4–5 fotografias seguidas; cada uma mostra o círculo a rodar e fica fixa quando chega ao Drive.
4. **Recuperação:** Definições do Android → Opções de programador → ligar **"Não manter atividades"**. Tira uma fotografia: ao voltar da câmara a app reabre sozinha na vistoria e mostra "Fotografia recuperada…". Volta a desligar a opção.
5. **PDF:** com Drive ligado → "PDF guardado no Google Drive". Em modo avião → abre a partilha do Android.
6. **Voltar:** com uma janela aberta fecha-a; na vistoria, 2 toques seguidos para sair.

## Se algo correr mal

- **"Google Cloud: o cliente Android (pacote/SHA-1) não corresponde…" (código `api_10`):** o cliente Android não existe, está noutro projeto, ou o SHA-1 não é o do APK. O SHA-1 certo é o do resumo da execução no Actions.
- **"Pasta nova criada no Drive: …" quando devia existir:** o Google só mostra a uma app os ficheiros criados por ela (ou por outro cliente do mesmo projeto). Confirma que o cliente Android foi criado no mesmo projeto da PWA. Se mesmo assim a APK não vir as pastas, avisa-me — há um plano B (login pelo browser com o cliente Web da PWA).
- **A compilação fica vermelha no Actions:** abre o passo que falhou, copia as últimas ~40 linhas do registo e envia-mas.
- **Trocar de conta Google:** Definições do Android → Apps → Vistoria Final de Obra → Armazenamento → Limpar dados.
- **Fotografias temporárias:** a app apaga sozinha as da câmara com mais de 24 h (já estão no Drive).

## Notas técnicas

- Capacitor 8.5.3 · Java 21 · Node 22 · AGP 8.13 · pacote `pt.luvio.vistoria` · minSdk 24 (Android 7+).
- A pasta `android/` **não** está no repositório: o Actions gera-a de cada vez (`npm run android:prepare`) a partir do `index.html`, dos plugins e de `native/` (plugin Java do login Google, ícones). Para mudar o ícone, edita `scripts/make-icons.py` e corre-o.
- No Drive a APK usa o âmbito `drive.file`, tal como a PWA. Na APK os pedidos ao Drive não levam a chave de API (o token OAuth basta).
- **Chave de assinatura:** guarda uma cópia de `vistoria-release.keystore` num sítio seguro (gestor de palavras-passe, por exemplo) e nunca a ponhas no GitHub. Se a perderes não consegues atualizar por cima: terias de desinstalar a app e registar um SHA-1 novo no Google Cloud (os dados no Drive não se perdem).
- Para usar uma chave tua em vez desta:
  ```
  keytool -genkeypair -v -keystore vistoria-release.keystore -storetype PKCS12 -alias vistoria -keyalg RSA -keysize 2048 -validity 10000
  base64 -w0 vistoria-release.keystore        # → segredo KEYSTORE_BASE64
  keytool -list -v -keystore vistoria-release.keystore -alias vistoria    # → SHA-1 para o Google Cloud
  ```

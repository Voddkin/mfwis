using System;
using System.IO;
using System.Diagnostics;
using System.Drawing;
using System.Windows.Forms;

namespace SantniStudio
{
    public class GameLauncherForm : Form
    {
        private string baseDir;
        private Label statusListLabel;

        public GameLauncherForm()
        {
            baseDir = AppDomain.CurrentDomain.BaseDirectory;
            this.Text = "My Favorite Woman Is Small";
            this.ClientSize = new Size(680, 490);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.FormBorderStyle = FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.BackColor = Color.FromArgb(255, 246, 250);
            this.Font = new Font("Segoe UI", 9.5f, FontStyle.Regular);

            string icoPath = Path.Combine(baseDir, "midias", "logos", "laco_icone_oficial.ico");
            if (File.Exists(icoPath))
            {
                try { this.Icon = new Icon(icoPath); } catch { }
            }

            BuildCleanInterface();
            RefreshPngStatus();
        }

        private void BuildCleanInterface()
        {
            // Logo Oficial perfeitamente centralizada no topo, sem cabeçalho branco nem ícones duplicados
            PictureBox gameLogoBox = new PictureBox();
            gameLogoBox.Size = new Size(360, 125);
            gameLogoBox.Location = new Point((this.ClientSize.Width - 360) / 2, 16);
            gameLogoBox.SizeMode = PictureBoxSizeMode.Zoom;
            gameLogoBox.BackColor = Color.Transparent;
            string gameLogoPath = Path.Combine(baseDir, "midias", "logos", "logo_jogo_oficial.png");
            if (File.Exists(gameLogoPath))
            {
                try { gameLogoBox.Image = Image.FromFile(gameLogoPath); } catch { }
            }
            this.Controls.Add(gameLogoBox);

            // Coluna Esquerda: Verificador Limpo dos PNGs
            Panel statusCard = new Panel();
            statusCard.Location = new Point(26, 155);
            statusCard.Size = new Size(315, 308);
            statusCard.BackColor = Color.White;
            statusCard.BorderStyle = BorderStyle.FixedSingle;
            this.Controls.Add(statusCard);

            Label statusTitle = new Label();
            statusTitle.Text = "🎀 PNGs Detectados (midias/)";
            statusTitle.Font = new Font("Segoe UI", 10f, FontStyle.Bold);
            statusTitle.ForeColor = Color.FromArgb(158, 25, 70);
            statusTitle.Location = new Point(14, 12);
            statusTitle.Size = new Size(285, 22);
            statusCard.Controls.Add(statusTitle);

            statusListLabel = new Label();
            statusListLabel.Location = new Point(14, 38);
            statusListLabel.Size = new Size(285, 216);
            statusListLabel.Font = new Font("Segoe UI", 8.5f, FontStyle.Regular);
            statusListLabel.ForeColor = Color.FromArgb(60, 32, 44);
            statusCard.Controls.Add(statusListLabel);

            Button btnRefresh = new Button();
            btnRefresh.Text = "🔄 Atualizar Lista de PNGs";
            btnRefresh.Location = new Point(14, 260);
            btnRefresh.Size = new Size(285, 34);
            btnRefresh.FlatStyle = FlatStyle.Flat;
            btnRefresh.BackColor = Color.FromArgb(255, 236, 244);
            btnRefresh.ForeColor = Color.FromArgb(158, 25, 70);
            btnRefresh.Font = new Font("Segoe UI", 8.8f, FontStyle.Bold);
            btnRefresh.Cursor = Cursors.Hand;
            btnRefresh.Click += (s, e) => RefreshPngStatus();
            statusCard.Controls.Add(btnRefresh);

            // Coluna Direita: Botão Principal de Jogar + Pastas
            Button btnPlay = new Button();
            btnPlay.Text = "▶ INICIAR JOGO";
            btnPlay.Location = new Point(360, 155);
            btnPlay.Size = new Size(294, 82);
            btnPlay.FlatStyle = FlatStyle.Flat;
            btnPlay.FlatAppearance.BorderSize = 0;
            btnPlay.BackColor = Color.FromArgb(230, 34, 92);
            btnPlay.ForeColor = Color.White;
            btnPlay.Font = new Font("Segoe UI", 13.5f, FontStyle.Bold);
            btnPlay.Cursor = Cursors.Hand;
            btnPlay.Click += (s, e) => LaunchGameAppWindow();
            this.Controls.Add(btnPlay);

            this.Controls.Add(CreateActionButton(
                "📂 Pasta: PNGs da Personagem\n(Aurora PNG 2, PNG 4, PNG 20...)",
                new Point(360, 250),
                () => OpenFolder(Path.Combine(baseDir, "midias", "personagem"))
            ));

            this.Controls.Add(CreateActionButton(
                "🔥 Pasta: PNGs de Cenas & NSFW\n(midias/cenas_especiais)",
                new Point(360, 325),
                () => OpenFolder(Path.Combine(baseDir, "midias", "cenas_especiais"))
            ));

            this.Controls.Add(CreateActionButton(
                "📝 Pasta: Diálogos Editáveis\n(data/)",
                new Point(360, 400),
                () => OpenFolder(Path.Combine(baseDir, "data"))
            ));
        }

        private Button CreateActionButton(string text, Point loc, Action onClick)
        {
            Button b = new Button();
            b.Text = text;
            b.Location = loc;
            b.Size = new Size(294, 62);
            b.FlatStyle = FlatStyle.Flat;
            b.BackColor = Color.White;
            b.ForeColor = Color.FromArgb(65, 30, 45);
            b.Font = new Font("Segoe UI", 9f, FontStyle.Bold);
            b.Cursor = Cursors.Hand;
            b.Click += (s, e) => onClick();
            return b;
        }

        private void RefreshPngStatus()
        {
            string[,] coreFiles = new string[,] {
                { "Aurora PNG 2.png (Menu)", Path.Combine(baseDir, "midias", "personagem", "Aurora PNG 2.png") },
                { "Aurora de uniforme PNG 4.png", Path.Combine(baseDir, "midias", "personagem", "Aurora de uniforme PNG 4.png") },
                { "Aurora PNG 20.png (Casual)", Path.Combine(baseDir, "midias", "personagem", "Aurora PNG 20.png") }
            };

            string report = "Principais da Personagem:\n";
            for (int i = 0; i < coreFiles.GetLength(0); i++)
            {
                bool ok = File.Exists(coreFiles[i, 1]);
                report += (ok ? "  ✅ " : "  ⏳ ") + coreFiles[i, 0] + "\n";
            }

            string scenesDir = Path.Combine(baseDir, "midias", "cenas_especiais");
            int sceneCount = 0;
            if (Directory.Exists(scenesDir))
            {
                sceneCount = Directory.GetFiles(scenesDir, "*.png").Length;
            }
            string charDir = Path.Combine(baseDir, "midias", "personagem");
            int charCount = 0;
            if (Directory.Exists(charDir))
            {
                charCount = Directory.GetFiles(charDir, "*.png").Length;
            }

            report += "\nResumo das Pastas:\n";
            report += "  • midias/personagem: " + charCount + " PNG(s)\n";
            report += "  • midias/cenas_especiais: " + sceneCount + " PNG(s)\n\n";
            report += "Dica: Coloque seus PNGs nas pastas ao lado para ativá-los automaticamente nas cenas.";
            statusListLabel.Text = report;
        }

        private void OpenFolder(string path)
        {
            try
            {
                if (!Directory.Exists(path)) Directory.CreateDirectory(path);
                Process.Start("explorer.exe", "\"" + path + "\"");
            }
            catch { }
        }

        private void LaunchGameAppWindow()
        {
            string indexHtml = Path.Combine(baseDir, "index.html");
            string fileUri = new Uri(indexHtml).AbsoluteUri;

            string[] browsers = new string[] {
                @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
                @"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
                @"C:\Program Files\Google\Chrome\Application\chrome.exe",
                @"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
            };

            foreach (string br in browsers)
            {
                if (File.Exists(br))
                {
                    Process.Start(br, "--app=\"" + fileUri + "\" --window-size=1360,860");
                    return;
                }
            }

            Process.Start(new ProcessStartInfo(indexHtml) { UseShellExecute = true });
        }

        [STAThread]
        public static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new GameLauncherForm());
        }
    }
}

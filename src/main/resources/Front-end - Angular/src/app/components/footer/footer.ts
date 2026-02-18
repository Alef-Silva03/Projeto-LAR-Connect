import { Component } from '@angular/core'; // Adicionado para corrigir o erro TS2304
import { RouterLink } from '@angular/router'; // Adicionado para corrigir o erro TS2304

@Component({
  selector: 'app-footer',
  standalone: true, // Necessário para corrigir o erro NG2012
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer { }
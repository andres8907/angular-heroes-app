import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),              
    superhero: new FormControl<string>('',{nonNullable: true}),   
    publisher: new FormControl<Publisher>(Publisher.DCComics),    
    alter_ego: new FormControl(''),     
    first_appearance: new FormControl(''),
    characters: new FormControl(''),  
    alt_img: new FormControl(''),
  });

  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},
    
  ];

  constructor(
    private heroesServices: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){}

  
  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    
    if( !this.router.url.includes('edit')) return;

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroesServices.getHeroById(id)),
    )
    .subscribe( hero => {
      if( !hero) return this.router.navigateByUrl('/');

      this.heroForm.reset(hero);
      return;
    });


  }
  
  onSumit():void{
    if( this.heroForm.invalid) return;
    
    if( this.currentHero.id){
      this.heroesServices.updateHero(this.currentHero)
      .subscribe( hero => {

      });
      return;
    }

    this.heroesServices.addHero(this.currentHero)
    .subscribe( hero => {

    });

  }

}
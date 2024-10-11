CREATE DATABASE stockify ;

CREATE TABLE utilisateur (
   id_user uuid  PRIMARY KEY DEFAULT
   uuid_generate_v4(),
   username varchar(255),
   mdp varchar(255),
   email varchar(255)
);


CREATE TABLE entrepot (
    id_entrepot SERIAL PRIMARY KEY,
    nom_entrepot varchar(255),
    adresse varchar(255),
    capacite int
);

CREATE TABLE categorie(
    id_categorie SERIAL PRIMARY KEY,
    nom_categorie varchar(255),
    description_categorie varchar(255)
);

CREATE TABLE produit (
    id_prod SERIAL PRIMARY KEY ,
    nom_prod varchar(255) ,
    description_prod varchar(255),
    prix_unit float,
    remise  int,
    image_prod  varchar(255),
    qte_prod int ,
    id_entrepot int ,
    id_categorie int,
    FOREIGN KEY (id_entrepot) REFERENCES entrepot(id_entrepot),
    FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
  );

  CREATE TABLE stock (
    id_stock SERIAL PRIMARY KEY,
    id_prod int,
    qte_stock int ,
    seuil_stock int,
    FOREIGN KEY (id_prod) REFERENCES produit(id_prod)
  );
  ALTER TABLE utilisateur ADD image_user varchar(255);
  UPDATE utilisateur SET image_user=NULL ;
  ALTER TABLE utilisateur DROP COLUMN id_prod;
  ALTER TABLE produit ADD id_user uuid;
  ALTER TABLE produit ADD CONSTRAINT fk0 FOREIGN KEY (id_user) REFERENCES utilisateur(id_user);
  ALTER TABLE categorie ADD id_user uuid;
  ALTER TABLE categorie ADD CONSTRAINT fk1 FOREIGN KEY (id_user) REFERENCES utilisateur(id_user);
  ALTER TABLE entrepot ADD id_user uuid;
  ALTER TABLE entrepot ADD CONSTRAINT fk2 FOREIGN KEY (id_user) REFERENCES utilisateur(id_user);
  ALTER TABLE stock ADD id_user uuid;
  ALTER TABLE stock ADD CONSTRAINT fk3 FOREIGN KEY (id_user) REFERENCES utilisateur(id_user);
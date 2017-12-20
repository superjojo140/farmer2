"use strict";


/**
 * Class to handle Texture loading from spritesheet
 */
export class TextureLoader {

    static spritesheet: PIXI.loaders.Resource;

    /**
     *Sets the spritesheet ressource
     *@param {Object} ressource The spriteheet's ressource
     */
    static init(ressource: PIXI.loaders.Resource): void {
        TextureLoader.spritesheet = ressource;
    }

    /**
     *Returns the texture from spritesheet
     *@param {String} textureName The textures filename without extension
     */
    static getTexture(textureName: string): PIXI.Texture {
        //The ! is used to avoid "error TS2533: Object is possibly 'null' or 'undefined'"
        //For further Information see https://stackoverflow.com/questions/40349987/how-to-suppress-typescript-error-ts2533-object-is-possibly-null-or-undefine
        if (TextureLoader.spritesheet != null) {
            if (TextureLoader.spritesheet.textures![textureName] != null) {
                return TextureLoader.spritesheet.textures![textureName];
            }
            else {
                throw new Error("[Texture Loader] Cant load texture " + textureName);
            }
        }
        else {
            throw new Error("[Texture Loader] TextureLoader is not initialised");
        }

    }

    /**
     *Returns the Sprite from spritesheet
     *@param {String} spriteName The sprite's texture's filename without extension
     */
    static getSprite(spriteName: string): PIXI.Sprite {
        return new PIXI.Sprite(TextureLoader.getTexture(spriteName));
    }



}

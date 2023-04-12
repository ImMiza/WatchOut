export default class Settings {
    static _spaceshipModel: string = Settings.getSpaceshipModels()[0];

    static _meteorModel: string = Settings.getMeteorModels()[0];

    static _soundAllow: boolean = true;

    static getSpaceshipModel(): string {
        return this._spaceshipModel;
    }

    static setSpaceshipModel(value: string): void {
        this._spaceshipModel = value;
    }

    static getMeteorModel(): string {
        return this._meteorModel;
    }

    static setMeteorModel(value: string): void {
        this._meteorModel = value;
    }

    static isSoundAllow(): boolean {
        return this._soundAllow;
    }

    static setSoundAllow(value: boolean): void {
        this._soundAllow = value;
    }
    static getSpaceshipModels(): string[] {
        return [
            '/images/rockets/blue_rocket.svg',
            '/images/rockets/green_rocket.svg',
            '/images/rockets/orange_rocket.svg',
            '/images/rockets/red_rocket.svg',
            '/images/rockets/white_rocket.svg'
        ];
    }

    static getMeteorModels(): string[] {
        return [
            '/images/meteors/yellow_meteor.png',
            '/images/meteors/red_meteor.png',
        ];
    }
}
// import type { OpMeta } from "rain-metadata/type-definitions/op";

export type EvaluableConfig = {
	deployer: string;
	sources: any[];
	constants: any[];
};

export const constructEvaluableConfig: () => EvaluableConfig = () => {
	return {
		deployer: '',
		sources: [],
		constants: []
	};
};

export type Deployer = {
	address: string;
	opmeta: string;
};

export type GetDeployers = () => Promise<Deployer[]>;

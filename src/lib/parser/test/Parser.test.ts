import { describe, it, expect } from 'vitest';
import {
    cleanup,
    render,
    screen,
} from '@testing-library/svelte';
import Parser from '../Parser.svelte';
import { get, writable, type Writable } from 'svelte/store';
import type { Deployer } from '../types';
import { rainlang, rlc } from '@rainprotocol/rainlang';
import { type ExpressionConfig, type RDProblem, MetaStore } from '@rainprotocol/rainlang';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import type { Signer } from 'ethers';

describe("Parser Tests", () => {
    let user: UserEvent;
    let selectedDeployer: Writable<Deployer>;
    let expressionConfig: Writable<ExpressionConfig>;
    let addressContext = new Map([]);
    let signer: Signer;
    let errors: RDProblem[];

    const deployers = [
        {
            id: '4981eae3-7f4f-56ad-91de-d44e26775d7e',
            address: '0x023be8a728af2e5fccb62ab8159771718043ee1d',
            chainId: 80001,
            created_at: '2023-03-17T02:45:03.625651+00:00',
            opmeta:
                '0x789ced5d5b93dbb6157ecfafc0ec78a6762ada2b6d1c6f3dd387c44edb4c133b633bed741c3f4024246196226482d4aed2c97fef3907e09da0485dd6bb5b3d24e68a20017ce73b170007e0c7af18fb2ffcc7d859c497e2ec253b0b84af02e14d9e7f7b36327702a17dbcf39aee30ce74287dc1d48c4d65a2994a13bce60c1ec15fd89a87a9608f79b44916329a3315b16421984eb87ff5e469f656b512318f0278f147fa216b48a531f04c9cd8272a6df91eea9151206e58a2189562b1e00156378bd5f269f9196c2556733962e3e79fecef7f8cdcb586229a278bb66adfa4cba988f3ae43dd582b55695ad15af1f988bdc8eba57f3f591064b44aa94cd68ab3158fa1158988750999722bcbe8a834f6c5597eeb0f7b65eafa23033a4d6c2563fb0b0f25d7822a38235992b4f1297aa6460811b908f103dd615a2d054be234f2792202830c21d2931220480092b3485c571f3871e5885c1975978706ce45b21fb77cb5da783d0876b30a916117933ac17e4159f188a5c0106486a111d1e5926981ac48041bb3e906fed1f277614ae816e29c1f04457a7d7f502e5b40b1bdc5cee65d7742e32fb88c42195d79ab1860ace3f3815f09cdfe2640eba097ec7dc243f1dd0cba6271c8c9e65f510190a826c57b95bd97bd8db91f0a7ac79f34a35aa8a87908cbc642a761c2a6d0830015b7a8e55828cfa03125dd28759807013447a35261d34c73a9786f626b6cbec74bedafd511a4c02a091dc54a249ab6054f6c55d7320cd994682683fd94c308d429781525e226a90bfcc7488b1864083a614b305f40934825728b0afa905b385f85e9322291c6eada102293d710eb6adeb397a984fa77b478e74d44bb71f34c73bd05d78b3a86ef1122a306789b629788892891b12850a5e79fb25fb598a5219ba998e988aff4422509c28a78861c35cd5f08ff8a7e62a1d4140aa520245058b59601a88cd324ed84f67905ed43c15588a649b5be4cc31f2ddbca2cab528f9eda138aac855559dda63345b8fa2bbf03fb990a03cfa1e7bf881828b744f443053005cce700be5a03e128dc32ed37961affceb0809669a657c2973389b1d8866135869e9929d03608b27f9bd008df742d8364017f17a28be7e9123443e34326d2417ecb4440d3a01cd636489816f616518d277dcd08b5b28d0f511e70999e51cc85f0116e2ed335ee53a795959b89842454875e9234c1d4dbcaca6fcaaceca8d4846c1ec9a7ad562338eb0a4d618a3253972e5cf4d5859a50b2b70dd2117a6bd5c3ea15da0ab8098305d15b7f5cadaa142f7b561496dbb1821eb5875146af88da64aa0a2347162c8d501b2dccd7123441a753af2840fa58c44b1aa8800154c9580e1bcd1c54f8bd896e60f73096ee56b14c3e7bf0db6d0c76e12a3d73c7985a20d1ca53183163a089038159e4646c20a6e9bc4ed9efbeff919981b9219d0d5f0a3a866a0e263ac908b8e07180612cf809ad4231888a4b1ca1b490811a3647df522f5192c9f9e058e5bc052ae80da294b73ebff4f08e1339e55d2f64d81836bd33ba4cf73243cd0a6a1b1b90805188b2790c836b0a208726200a244a0e10d60c68761f347b8bb6957ea7c1cd3b1ecdf1b98f36e22c17f0d512de4583241a94c573e6b1f159b7a0b7286ced9d3465f26778e991357acb60319774fb5031bf8de22ae8d43f366c07c569310c9bddf328804e54277b8f417a8b0e3aaac0de798d2a7e4215ca7d6344a3668db127e8109a87ba67ad38cd241b3b54fc260d33867b4d6adf76e785c5f68c424ffef9c1fb675265f4cd2a76ea1c36c35b8aa58a37ed51258f88f986f8e8b4124ee3a938e61ba6e2b242180d41b59034f666346fbd7304d98f9ad4383b37ddaa117d1522d9ac5a2989bf67956125a33a1438b552ea5c9d34c30388b6d936ea9e4b886db344ffc0a9a1c7106248b0f01b76257c9f5f4d9e7ffbc44e4297c283c29cd5274d0f3436a6690cb78306114d9e83871eae902fbeb042baa64644ec7be3f1f3e7de94873c0233ab6675f9fc5d2404b42d6167f17e78f70a9f0342a374cc6fdcf715446e0315eb3033d9d40ecfce5af79fa3b64d1eb05a43f5ec3b255d87dd1d6934e5039789dfd0a29a9474ab987072959eb6f74de78d253425647050bbb8a79eb923e1c736147ec29eb1497b3cdc1dfbd5bc515fe5ad3783a2e7afd9e4c9ee21f49ecc3d40ec9d737a6743e3e03630ad17c327e7bbd89fc9f9c3b33e3bda9202c06d38272ae1a1a7d3d52a6cc45119d2e66e0bd07709dadd91b29ddf0254b60855b6bcbcb17c9043664b0f652962f0e5b13cb493ccb13b849f6c91456fd995d9de477af782f95f0afc1e7af3fc627ce1a9eba8c858a8ac05136674bb80181f61e856a1e688a64d9398fbc9d1124bb20a7630291d1d7f3119efe2c2e0b1930fb3542b41d8c9312c471cea00bac6b10700f3e1c61d397e1d79883a8d9b73f9e2738a2b1f3479f2583fc9a7dc12bbfc36a5dc443162f2a978cae6103d62d646b200c07f17b11ac1507d4d50cf58a44e23f62de26b5b9c898d089c829b86cabff2ccd4a42bcb849247d23816c07f2a9fadc70ca67fbff9205b9747756d69394d67277cb96a6f7c4bdbf3277a37bfd9da4687cacd8f305f87e5bdc0faea7f9b16bb7a069ade250a9bf307baa4d325fef326cb282ccd7b156af62546e3937bab43ad69d8e9d2bd8c29d7fd64050565204ee23abeb80cd25d19cdfd24060555846bf76609f124b6e38a6d65cc26fcd311672cf94d97f0e0b65c9e8ce26d88cb428d22834b0cac9d32938d45e98acc647492d92dc9cc404d329351a7cc54670802b74ff2ba9de5b665da4889ac48029c955c85d2e7273f757b42d1e9b44b28709b268c4e12b92db3966aa729d33eee291a5f362727e80ee36c266f44c0560a2451ca347cc302e1cb250f29557d7c59fc79bd10b180fb92f2ec69f2c8486bd83e92ec7d6d8919afb3baec8c89c96b980accc78a4dc383d62d8ae34a527853f228c21785e047eee6c52a8d7073426bf3642c0cbd313b050b667b4cf13711c72a269822864dc54607ea3a7acaced95fd96bb88246c2d5af2bd72ecbf32d298fbd997bc4fd83ad2345140c506d1b17bd61c3c62c0b6f62d3902ad368534c8011abac0c10b5cce79cb47b98992ea20635a2ce64aced0ee11decd2f930bb3458bae3aa09cab3c16a0d2f38b0658a958a4fdc2fd502b3501b6fdd9d598638ec6cb6a2abed3cdbc04fd23f8aed6bf366c32ce0ff9d89c9e600738d1ac6b4035128e384a191fd6b2b95b604a285c9b221e9e664b5f627cc03b15ac41da21b5e75536dda483279df62abd215e6a6a2ca2395768abfa8ba7676807020a8b4db77d2d533aac79a4ccd26daac3e0bdc7ee9e4cbd12214a7dc6cf2abb22d0520fb0baf53248df99bdc7f44a8b96fdffeacdb1c49de9237c304638eb7f0ba1418e5628a553c95a92e51c75ff63b9ed8e0e2cdfe82e351438dcad6dad88d48451eaeb3da26e04a771816e30d4a33a22df41a57601372fde2466a4c0c8fc48889500bbb1aae69c1b666af8789fd349a259bd9b1a141f0b9883dd9c86130bb192edc1b644988568656f6b4b700a2b89c03b4e1a03c8961bc802957116b4df0f8fb456c4a1e3105a76bafd7073ade20dbef056d1548609e0c708a2bae35ee184eea56dda9ad66f66666cf56c82a2f41fa0cb9d0bf05332ec303b5806a9f8151dcd37f4bf70cb1f89cf2d0cb4d6ddec257e019796c5d67c88169adf15fa2c07683412925d468d29d67e3d2fe32dbb90de36879d2cf3cac718ffaf8ecfc58b4b3e1d7d0c86a2fccc56737e66bd1dccad434ebbdac391d5941e82e09dd8cb427ab5eba7538ab8e38b9c46af39e3ccc7b6a37ed568fda0f8e32871b9454a734b7dc18dea075a8e45925b5809f5e69d5cae65d1df7c4ae5b56af79e29483d4a4010d8b568e800a1449335cd6ab22024c14d45fc070ed69fbb5673c080cdc30f9ce855a28c071de1675b1b243f0b623a5eb0e31b9b2e1d52d81553cf5d2e0dbf31b1869f375e3388a5fde7dff334f16ecd7d754e4257bc5433fc503b28cd3e0b14c16d051e9330e0e06624c740ce6d4a1cd88659374667eed5884bde98fdd90616d0b908816a144f31178d507575fc8c6f45703d8ff481106367a862129903561d70b05833a5b241b19572cb08a19055318d2dddc0ac03ba2663020d8e8b20f6e2d0b1d0dd85e53c216e076ad6a4069cc004ed238328764e121a4d5024fd93ba4270efeaf791c18abfc4048da35c15f86b825a16d9bca471c4005c665296ea4f077997ad447621e5ef544a57964e91658a632e2f1a68a0a4b7536496d6fcfb2a57de8ff42b54d3ade25d826056e935ec0cd42a51aa9e05da6ce183397a92b3cf6bdb173160182cd5cf7c20d6831043671e3233453b1c11886621dacebceaba2e9a701072ffb60335f0e55c5b950d0a7186292a5e0512520a1bd228f1ee9cf71f2f8867dcd364f1e3d7a9861ca7c69819ebb13d0cb30cb68bbb32de13c66cfd84d0939e3436fcf85ee880af59260c1ab3eb8848db1495f0719aab9098fefbc5a86910525749f5657c144cdc7e74361f1d572098eef1ea1627a6980a1eb9ed8ec1a3bdc2b68260532fd6283961c80062e3fdb8cd4f6803e9ff8dd1ad93f0c13deb5de5d4676d53ce4b981ec3b2ee1d5ec263b3792b64a20cf360f042c04a12758697fb41e43fc50e5d6932a821bf6388db49c47782833d71073c82811732c5704ff33be54a9663c9c2ba3dfbf9de51b844c4ed274c334c4b7313cf1dbd9c39148da4b24188d0d3599849680f84399a1d69708e276c4c574978c275d3a535a288ec06314bd8e5d9d761f2761921f0fee5ccc9533b6a27dd1780e93d9209dcf4edb2cacb9c2d3eda66a4d5ba2f20fb7944e263c2dde0c903848d188af22506d76d2e0cdae1da2a5273a52e8b27d1c20f82293ee44883b4c88ce4cb6324b9c5b456adb440e2ced69a8ae59793deb24e0610246c939970a551c8878aad495b71e7b6b0ea8e72791d4a4fda1718a4bfe2ca3078fe5e68a2666478754c02ab7aff6e99e1fdf668ffe6bd23fdc3027ac0cadeb6d76ee8a595c453c7ad7583d18a56f8d1ff0a9214b7528dc7d8f51a951a42c9dea2df7e2346662ae275e2c965ce2b0c9b307bc446b8841dbceb82583600bb3f8c33fdfe0fae9cc1c3b4f67af68fc18c391d867da7b9043d8e84dee6ef7400cecedba5531edadecc8ae0a93ee0124a65f5b01a07f31b32cd5edbe28733150c07c2ef23d66a266e75eb57c57c81e1e8e475966da557555f705438bca56088920ad0c02bdba6fc4319de9d1673c0acfb20cfef5855c8bc6200641a0920c47c866d5aca25618a598478939c810def6958bbb8a552b084ef0201e93b30d4605f6c8304b318f67470155e17b87df9db4b93075352c8e1dcb95cbbc9eadc72eedbcbd9c17db55ece98e27c0f51553c5911a7cb7e8ed5c3466230cd0ec4a6c9e9984a11597717edeb981528343c1fc17e0a9f9445c36fb738539a89543c4cb49fd07273154d71ece646db1a14cb53307d8eed184eddf318c449ab8b51eb17e4d65898f75488f89d480506e50565cdbe15ed445b7f6271242600a3956aa392156dd2f87256a6a4ebe17df51e087b8aa158e1179186eb26fc9e1d647e92f2873f7ee9c2af069c43e5ee0ffc6e7dbbf49e338837bc763b5ed37698a5d6dc34c19c9edf8a7dc56bf28686fd636316001cc92301993c71ae052872d4b7bb299dc973753b187bf7771bb98c5202e87622dc2874878e2fa3744f8f176c25f1c83f0177b101e247b0b5f3f40aedc6f05a911bfc7a45f20678d4d5a1505c98b322c2a6261678726564d7a9d1563c2469c02744f054e857b1af0fe26f1e3f41c61ec948508859f7861d288b71d276952f92cda2b72d6f284b5c2a4b93e31b354f07471844226470825f13bb173ccae0671e1d7f8f6b155f4a6b61db1a6070c7a6c6a7bc968b71066ddf168c31acfe507c65c8cd8b8f860d4c85db5eb5383a59ab1c84b3cd16d44cb0cf80925ccdf6fabf772c4fed2615a714f7daf636aeecf39bfb10045274d6f9c5a5b439486d4f931b5184dd3fe4ddaf48cbe32e3169f73fc20407fddab84a52d955a1f8d7c27a1fe0432458e1fc4c83a54355d053cb190e446d68b494ebd74975e907fa80e9f335f87c76c138a2fb25ed5559654b3a1ce070929441494a3a44a2f28f9d366dc49b34dde60d046e26fb61e3d71d94b4de8abd29d4da212fd1ab5fda3949747d9485fa68a5b7b92baf698c7acea103f1275189d492a3a63ebc1c0aca86b3f4797f718f119b1f2df5645c8037ef5e9abff01b5349ddf'
        },
        {
            id: '1b7593ab-9e7e-5a70-90cd-fdcc06390e2f',
            address: '0xac9bba4cde1c29a42ccac3e26e82f794243f1071',
            chainId: 80001,
            created_at: '2023-04-08T04:49:21.184584+00:00',
            opmeta:
                '0x789ced5d5b93dbb6157ecfafc0ec78a6762ada2b6d1c6f3dd387c44edb4c133b633bed741c3f4024246196226482d4aed2c97fef3907e09da0485dd6bb5b3d24e68a20017ce73b170007e0c7af18fb2ffcc7d859c497e2ec253b0b84af02e14d9e7f7b36327702a17dbcf39aee30ce74287dc1d48c4d65a2994a13bce60c1ec15fd89a87a9608f79b44916329a3315b16421984eb87ff5e469f656b512318f0278f147fa216b48a531f04c9cd8272a6df91eea9151206e58a2189562b1e00156378bd5f269f9196c2556733962e3e79fecef7f8cdcb586229a278bb66adfa4cba988f3ae43dd582b55695ad15af1f988bdc8eba57f3f591064b44aa94cd68ab3158fa1158988750999722bcbe8a834f6c5597eeb0f7b65eafa23033a4d6c2563fb0b0f25d7822a38235992b4f1297aa6460811b908f103dd615a2d054be234f2792202830c21d2931220480092b3485c571f3871e5885c1975978706ce45b21fb77cb5da783d0876b30a916117933ac17e4159f188a5c0106486a111d1e5926981ac48041bb3e906fed1f277614ae816e29c1f04457a7d7f502e5b40b1bdc5cee65d7742e32fb88c42195d79ab1860ace3f3815f09cdfe2640eba097ec7dc243f1dd0cba6271c8c9e65f510190a826c57b95bd97bd8db91f0a7ac79f34a35aa8a87908cbc642a761c2a6d0830015b7a8e55828cfa03125dd28759807013447a35261d34c73a9786f626b6cbec74bedafd511a4c02a091dc54a249ab6054f6c55d7320cd994682683fd94c308d429781525e226a90bfcc7488b1864083a614b305f40934825728b0afa905b385f85e9322291c6eada102293d710eb6adeb397a984fa77b478e74d44bb71f34c73bd05d78b3a86ef1122a306789b629788892891b12850a5e79fb25fb598a5219ba998e988aff4422509c28a78861c35cd5f08ff8a7e62a1d4140aa520245058b59601a88cd324ed84f67905ed43c15588a649b5be4cc31f2ddbca2cab528f9eda138aac855559dda63345b8fa2bbf03fb990a03cfa1e7bf881828b744f443053005cce700be5a03e128dc32ed37961affceb0809669a657c2973389b1d8866135869e9929d03608b27f9bd008df742d8364017f17a28be7e9123443e34326d2417ecb4440d3a01cd636489816f616518d277dcd08b5b28d0f511e70999e51cc85f0116e2ed335ee53a795959b89842454875e9234c1d4dbcaca6fcaaceca8d4846c1ec9a7ad562338eb0a4d618a3253972e5cf4d5859a50b2b70dd2117a6bd5c3ea15da0ab8098305d15b7f5cadaa142f7b561496dbb1821eb5875146af88da64aa0a2347162c8d501b2dccd7123441a753af2840fa58c44b1aa8800154c9580e1bcd1c54f8bd896e60f73096ee56b14c3e7bf0db6d0c76e12a3d73c7985a20d1ca53183163a089038159e4646c20a6e9bc4ed9efbeff919981b9219d0d5f0a3a866a0e263ac908b8e07180612cf809ad4231888a4b1ca1b490811a3647df522f5192c9f9e058e5bc052ae80da294b73ebff4f08e1339e55d2f64d81836bd33ba4cf73243cd0a6a1b1b90805188b2790c836b0a208726200a244a0e10d60c68761f347b8bb6957ea7c1cd3b1ecdf1b98f36e22c17f0d512de4583241a94c573e6b1f159b7a0b7286ced9d3465f26778e991357acb60319774fb5031bf8de22ae8d43f366c07c569310c9bddf328804e54277b8f417a8b0e3aaac0de798d2a7e4215ca7d6344a3668db127e8109a87ba67ad38cd241b3b54fc260d33867b4d6adf76e785c5f68c424ffef9c1fb675265f4cd2a76ea1c36c35b8aa58a37ed51258f88f986f8e8b4124ee3a938e61ba6e2b242180d41b59034f666346fbd7304d98f9ad4383b37ddaa117d1522d9ac5a2989bf67956125a33a1438b552ea5c9d34c30388b6d936ea9e4b886db344ffc0a9a1c7106248b0f01b76257c9f5f4d9e7ffbc44e4297c283c29cd5274d0f3436a6690cb78306114d9e83871eae902fbeb042baa64644ec7be3f1f3e7de94873c0233ab6675f9fc5d2404b42d6167f17e78f70a9f0342a374cc6fdcf715446e0315eb3033d9d40ecfce5af79fa3b64d1eb05a43f5ec3b255d87dd1d6934e5039789dfd0a29a9474ab987072959eb6f74de78d253425647050bbb8a79eb923e1c736147ec29eb1497b3cdc1dfbd5bc515fe5ad3783a2e7afd9e4c9ee21f49ecc3d40ec9d737a6743e3e03630ad17c327e7bbd89fc9f9c3b33e3bda9202c06d38272ae1a1a7d3d52a6cc45119d2e66e0bd07709dadd91b29ddf0254b60855b6bcbcb17c9043664b0f652962f0e5b13cb493ccb13b849f6c91456fd995d9de477af782f95f0afc1e7af3fc627ce1a9eba8c858a8ac05136674bb80181f61e856a1e688a64d9398fbc9d1124bb20a7630291d1d7f3119efe2c2e0b1930fb3542b41d8c9312c471cea00bac6b10700f3e1c61d397e1d79883a8d9b73f9e2738a2b1f3479f2583fc9a7dc12bbfc36a5dc443162f2a978cae6103d62d646b200c07f17b11ac1507d4d50cf58a44e23f62de26b5b9c898d089c829b86cabff2ccd4a42bcb849247d23816c07f2a9fadc70ca67fbff9205b9747756d69394d67277cb96a6f7c4bdbf3277a37bfd9da4687cacd8f305f87e5bdc0faea7f9b16bb7a069ade250a9bf307baa4d325fef326cb282ccd7b156af62546e3937bab43ad69d8e9d2bd8c29d7fd64050565204ee23abeb80cd25d19cdfd24060555846bf76609f124b6e38a6d65cc26fcd311672cf94d97f0e0b65c9e8ce26d88cb428d22834b0cac9d32938d45e98acc647492d92dc9cc404d329351a7cc54670802b74ff2ba9de5b665da4889ac48029c955c85d2e7273f757b42d1e9b44b28709b268c4e12b92db3966aa729d33eee291a5f362727e80ee36c266f44c0560a2451ca347cc302e1cb250f29557d7c59fc79bd10b180fb92f2ec69f2c8486bd83e92ec7d6d8919afb3baec8c89c96b980accc78a4dc383d62d8ae34a527853f228c21785e047eee6c52a8d7073426bf3642c0cbd313b050b667b4cf13711c72a269822864dc54607ea3a7acaced95fd96bb88246c2d5af2bd72ecbf32d298fbd997bc4fd83ad2345140c506d1b17bd61c3c62c0b6f62d3902ad368534c8011abac0c10b5cce79cb47b98992ea20635a2ce64aced0ee11decd2f930bb3458bae3aa09cab3c16a0d2f38b0658a958a4fdc2fd502b3501b6fdd9d598638ec6cb6a2abed3cdbc04fd23f8aed6bf366c32ce0ff9d89c9e600738d1ac6b4035128e384a191fd6b2b95b604a285c9b221e9e664b5f627cc03b15ac41da21b5e75536dda483279df62abd215e6a6a2ca2395768abfa8ba7676807020a8b4db77d2d533aac79a4ccd26daac3e0bdc7ee9e4cbd12214a7dc6cf2abb22d0520fb0baf53248df99bdc7f44a8b96fdffeacdb1c49de9237c304638eb7f0ba1418e5628a553c95a92e51c75ff63b9ed8e0e2cdfe82e351438dcad6dad88d48451eaeb3da26e04a771816e30d4a33a22df41a57601372fde2466a4c0c8fc48889500bbb1aae69c1b666af8789fd349a259bd9b1a141f0b9883dd9c86130bb192edc1b644988568656f6b4b700a2b89c03b4e1a03c8961bc802957116b4df0f8fb456c4a1e3105a76bafd7073ade20dbef056d1548609e0c708a2bae35ee184eea56dda9ad66f66666cf56c82a2f41fa0cb9d0bf05332ec303b5806a9f8151dcd37f4bf70cb1f89cf2d0cb4d6ddec257e019796c5d67c88169adf15fa2c07683412925d468d29d67e3d2fe32dbb90de36879d2cf3cac718ffaf8ecfc58b4b3e1d7d0c86a2fccc56737e66bd1dccad434ebbdac391d5941e82e09dd8cb427ab5eba7538ab8e38b9c46af39e3ccc7b6a37ed568fda0f8e32871b9454a734b7dc18dea075a8e45925b5809f5e69d5cae65d1df7c4ae5b56af79e29483d4a4010d8b568e800a1449335cd6ab22024c14d45fc070ed69fbb5673c080cdc30f9ce855a28c071de1675b1b243f0b623a5eb0e31b9b2e1d52d81553cf5d2e0dbf31b1869f375e3388a5fde7dff334f16ecd7d754e4257bc5433fc503b28cd3e0b14c16d051e9330e0e06624c740ce6d4a1cd88659374667eed5884bde98fdd90616d0b908816a144f31178d507575fc8c6f45703d8ff481106367a862129903561d70b05833a5b241b19572cb08a19055318d2dddc0ac03ba2663020d8e8b20f6e2d0b1d0dd85e53c216e076ad6a4069cc004ed238328764e121a4d5024fd93ba4270efeaf791c18abfc4048da35c15f86b825a16d9bca471c4005c665296ea4f077997ad447621e5ef544a57964e91658a632e2f1a68a0a4b7536496d6fcfb2a57de8ff42b54d3ade25d826056e935ec0cd42a51aa9e05da6ce183397a92b3cf6bdb173160182cd5cf7c20d6831043671e3233453b1c11886621dacebceaba2e9a701072ffb60335f0e55c5b950d0a7186292a5e0512520a1bd228f1ee9cf71f2f8867dcd364f1e3d7a9861ca7c69819ebb13d0cb30cb68bbb32de13c66cfd84d0939e3436fcf85ee880af59260c1ab3eb8848db1495f0719aab9098fefbc5a86910525749f5657c144cdc7e74361f1d572098eef1ea1627a6980a1eb9ed8ec1a3bdc2b68260532fd6283961c80062e3fdb8cd4f6803e9ff8dd1ad93f0c13deb5de5d4676d53ce4b981ec3b2ee1d5ec263b3792b64a20cf360f042c04a12758697fb41e43fc50e5d6932a821bf6388db49c47782833d71073c82811732c5704ff33be54a9663c9c2ba3dfbf9de51b844c4ed274c334c4b7313cf1dbd9c39148da4b24188d0d3599849680f84399a1d69708e276c4c574978c275d3a535a288ec06314bd8e5d9d761f2761921f0fee5ccc9533b6a27dd1780e93d9209dcf4edb2cacb9c2d3eda66a4d5ba2f20fb7944e263c2dde0c903848d188af22506d76d2e0cdae1da2a5273a52e8b27d1c20f82293ee44883b4c88ce4cb6324b9c5b456adb440e2ced69a8ae59793deb24e0610246c939970a551c8878aad495b71e7b6b0ea8e72791d4a4fda1718a4bfe2ca3078fe5e68a2666478754c02ab7aff6e99e1fdf668ffe6bd23fdc3027ac0cadeb6d76ee8a595c453c7ad7583d18a56f8d1ff0a9214b7528dc7d8f51a951a42c9dea2df7e2346662ae275e2c965ce2b0c9b307bc446b8841dbceb82583600bb3f8c33fdfe0fae9cc1c3b4f67af68fc18c391d867da7b9043d8e84dee6ef7400cecedba5531edadecc8ae0a93ee0124a65f5b01a07f31b32cd5edbe28733150c07c2ef23d66a266e75eb57c57c81e1e8e475966da557555f705438bca56088920ad0c02bdba6fc4319de9d1673c0acfb20cfef5855c8bc6200641a0920c47c866d5aca25618a598478939c810def6958bbb8a552b084ef0201e93b30d4605f6c8304b318f67470155e17b87df9db4b93075352c8e1dcb95cbbc9eadc72eedbcbd9c17db55ece98e27c0f51553c5911a7cb7e8ed5c3466230cd0ec4a6c9e9984a11597717edeb981528343c1fc17e0a9f9445c36fb738539a89543c4cb49fd07273154d71ece646db1a14cb53307d8eed184eddf318c449ab8b51eb17e4d65898f75488f89d480506e50565cdbe15ed445b7f6271242600a3956aa392156dd2f87256a6a4ebe17df51e087b8aa158e1179186eb26fc9e1d647e92f2873f7ee9c2af069c43e5ee0ffc6e7dbbf49e338837bc763b5ed37698a5d6dc34c19c9edf8a7dc56bf28686fd636316001cc92301993c71ae052872d4b7bb299dc973753b187bf7771bb98c5202e87622dc2874878e2fa3744f8f176c25f1c83f0177b101e247b0b5f3f40aedc6f05a911bfc7a45f20678d4d5a1505c98b322c2a6261678726564d7a9d1563c2469c02744f054e857b1af0fe26f1e3f41c61ec948508859f7861d288b71d276952f92cda2b72d6f284b5c2a4b93e31b354f07471844226470825f13bb173ccae0671e1d7f8f6b155f4a6b61db1a6070c7a6c6a7bc968b71066ddf168c31acfe507c65c8cd8b8f860d4c85db5eb5383a59ab1c84b3cd16d44cb0cf80925ccdf6fabf772c4fed2615a714f7daf636aeecf39bfb10045274d6f9c5a5b439486d4f931b5184dd3fe4ddaf48cbe32e3169f73fc20407fddab84a52d955a1f8d7c27a1fe0432458e1fc4c83a54355d053cb190e446d68b494ebd74975e907fa80e9f335f87c76c138a2fb25ed5559654b3a1ce070929441494a3a44a2f28f9d366dc49b34dde60d046e26fb61e3d71d94b4de8abd29d4da212fd1ab5fda3949747d9485fa68a5b7b92baf698c7acea103f1275189d492a3a63ebc1c0aca86b3f4797f718f119b1f2df5645c8037ef5e9abff01b5349ddf'
        }
    ];

    beforeAll(async () => {
        user = userEvent.setup();
        selectedDeployer = writable(deployers[0]);
        expressionConfig = writable({
            sources: [],
            constants: []
        });
        addressContext = new Map([['EVALUABLE_ADDRESSES', {
            getDeployers: async () => {
                return deployers;
            }
        }]]);
    });

    it("should render Parser component", async () => {
        render(Parser, {
            props: {
                deployers: deployers,
                raw: "",
                signer,
                errors,
            },
            context: addressContext
        });
        expect(screen.getByText("Expression"));
        expect(screen.getByPlaceholderText("Select interpreter"));
        expect(screen.getByText("Nothing to simulate."));
    });

    it("should hide components", async () => {
        render(Parser, {
            props: {
                deployers: deployers,
                signer,
                raw: "",
                hideHelp: true
            },
            context: addressContext
        });
        expect(screen.queryByText("Help")).toBeNull();
        expect(screen.queryByText("Load")).toBeTruthy();
        expect(screen.queryByText("Save")).toBeTruthy();
        expect(screen.queryByText("Detailed view")).toBeTruthy();
        cleanup();

        render(Parser, {
            props: {
                deployers: deployers,
                signer,
                raw: "",
                hideExpand: true,
                hideHelp: true,
                hideLoad: true,
                hideSave: true
            },
            context: addressContext
        });
        expect(screen.queryByText("Help")).toBeNull();
        expect(screen.queryByText("Save")).toBeNull();
        expect(screen.queryByText("Detailed view")).toBeNull();
        expect(screen.queryByText("Load")).toBeNull();
    });

    it("should display deployer addresses when passed using props", async () => {
        render(Parser, {
            props: {
                deployers: deployers,
                signer,
                raw: ""
            },
            context: addressContext
        });

        const interpreterDropdown = screen.getByPlaceholderText("Select interpreter");
        await user.click(interpreterDropdown);

        deployers.forEach(deployer => {
            expect(screen.getByText(deployer.address));
        });
    });

    it("should dispatch the save event", async () => {
        // Setup
        const expression = rainlang`_: add(10 20);`;

        // rendering component
        const { component } = render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression,
                expressionConfig
            },
            context: addressContext
        });

        // Mock function
        let raw = '';
        const mock = vi.fn((event) => (raw = event.detail.raw));
        component.$on('save', mock);

        // Clicking save button
        const saveButton = screen.getByText("Save").parentElement
        if (saveButton)
            await user.click(saveButton);

        // Assertion
        expect(mock).toHaveBeenCalled();
        expect(raw).toBe(expression);
    });

    it("should dispatch the load event", async () => {
        // Setup
        const expression = rainlang`_: add(10 20);`;
        const componentName = "ParserComponentTest";
        const loadRaw = expression;

        // rendering component
        const { component } = render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression,
                expressionConfig,
                loadRaw,
                componentName
            },
            context: addressContext
        });

        // Mock function
        let loadData = '';
        const mock = vi.fn((event) => (loadData = event.detail));
        component.$on('load', mock);

        // Clicking save button
        const saveButton = screen.getByText("Load").parentElement
        if (saveButton)
            await user.click(saveButton);

        // Assertion
        expect(mock).toHaveBeenCalled();
        expect(loadData).toEqual({ loadRaw, componentName });
    });

    it("should dispatch the expand event", async () => {
        // Setup
        const expression = rainlang`_: add(10 20);`;
        const componentName = "ParserComponentTest";
        const loadRaw = expression;

        // rendering component
        const { component } = render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression,
                expressionConfig,
                loadRaw,
                componentName
            },
            context: addressContext
        });

        // Mock function
        let expandData = '';
        const mock = vi.fn((event) => (expandData = event.detail));
        component.$on('expand', mock);

        // Clicking save button
        const saveButton = screen.getByText("Detailed view").parentElement
        if (saveButton)
            await user.click(saveButton);

        // Assertion
        expect(mock).toHaveBeenCalled();
        expect(expandData).toEqual({ loadRaw, componentName, raw: expression });
    });

    it("should dispatch the help event", async () => {
        // Setup
        const expression = rainlang`_: add(10 20);`;
        const componentName = "ParserComponentTest";
        const loadRaw = expression;

        // rendering component
        const { component } = render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression,
                expressionConfig,
                loadRaw,
                componentName
            },
            context: addressContext
        });

        // Mock function
        let helpData = '';
        const mock = vi.fn((event) => (helpData = event.detail));
        component.$on('help', mock);

        // Clicking save button
        const saveButton = screen.getByText("Help").parentElement
        if (saveButton)
            await user.click(saveButton);

        // Assertion
        expect(mock).toHaveBeenCalled();
        expect(helpData).toBe(null);
    });

    it("should generate an expressionConfig for valid rainlang expressions", async () => {
        // 0
        const expression0 = rainlang`@0x47ed85f917e187757bff09371cedcf5c0eb277c27e4673feb2d3cc040c66c993 _: add(10 20);`

        const _metaStore: MetaStore = await MetaStore.create({
            initMetas: {
                "0x47ed85f917e187757bff09371cedcf5c0eb277c27e4673feb2d3cc040c66c993": "0xff0a89c674ee7874a4005910d4789ced5d596fdc38127e9f5f411801369e6d39eef624f1cedb1c7b043b930c32d92c16992cc096d8dd8425b1234ab67b16f3dfb7aa48dda25a7df9423f24b6254a2c7ef555b14816a94f5f31f63ff8c7d849cc2371f22d3b0984af02e14d5ebe3a19993b81d03edef991ee30ce74287dc1d48c4d65aa99ca52fc9d337804afb06b1e66823de7f12a5dc878ce54ccd285603ae5fed5e959fe56b514098f0378f127ba900b5213069e4952fb444d96efa11e1907e296a58a512996081e6075b3444567d567504aace672c4c62f3fdbeb7f8cdcb586229ea78bae6adf66d1542445d3a16eac95aa345274567c3e62af8b7ae9e7670b828c971995c9a53859f204a44845a22bc854a5aca2a3b2c41727c5ad3fec6fa6ae3f72a0b3d45632b6577828b91654c109e992b48d4fd1330d4288d84588bfd21da65524589a64b1cf5311186408918194004502909cc5e2a6fec0912b07e4caa8bf3c083817e96edcf2d572e50d20d8ed3244865d4c9a04fb0575c5639601439019864644974ba605b222156ccca62bf8a1e5efc294d01dc439df0b8af4fae1a05c7680625b8b8d2d9aee84c65f70198732bef29609c0d8c4e703bf129afd4d80d5412bd9af290fc57733688ac5a1209b7f450540a39a0cef87fcbdec5dc2fd50d03bfea419d54245cd435836113a0b533685160468b8652d87427906c2546ca3d2601e04208e46a342d18cb8547c30b1358aeff18afc8d3a820c5825a1a1588944d7b6e0a9adea4686219b12cd64b09b7118853a15afe254dca64d85bf89b54840876013b604f305884426517854b087c2c3f92acca298549aa81b43885c5f9b7857f39e9d5c25d4bfa5c73b6f23da8f9b67c4f5165c2f9a18fe8a101933c0db14bbc44cc4a94c44892a3d7fc6fea5c52c0bd94c254cc77ca9172a4d1156c433e46869fe42f857748985525328948192c060d5b50cc0649c2e692bb4cf6b68ef0bae52356daa0d651a5eb46cabb2ac4e3d7a6a47287209ebbabacbce14e11a6efc0eec672a0c3c879dff2212a05c84e8870a600a98cf017c750d84a370cbc86f3c35fe9d63019269a697c2973389b1d82a5789897b4c18844fddc8205d6c464a8b5907cee38b2d7d40c52613b22b240a100c1bed0ecec668049321d5512bfb8333838f2e6a458c3b6b7d3d627f1952a7d5ab8bb54553ad62d6d6fbcd88bd1a52af89f03c527157c56f48f7b6e734852928cd6257207a31d4761a3cc8dfb6914dd15beb3db25ea26f819b30b81083edcd25d557f9c39d8e10ccab3bba32e6968ac84653a5ef23c796c568a416ce1b992e98cea65e5980ccb40ca334c4511857557ce866839c354a964e25bbbaeef1106e19743d0cb1bb6a8d0b6bcad5d0cde3d743ea72bb996d2849cf3c30429648e485ab81e10c06d2187fe2f860163b23c44079370b19b6c604ef0d23e99ef52c312b1564989c02b5e37c906ec89a4100149ade3e9058bf66523300eb31f0730d672ad729727fcfe3393ef7c98653d502be8ae05d3402a0114732671e1b9fec44bbc63b693ee0cff0d203f372cd48a8d074f738a8b88dea2ae9343cf0e906c5c97bc366f72401a01337c93e6004da0e86cf1d5560ebbc56153fa109151e3ea621a1c6c00a6c08bbf166ff5073fd691e18d7bc3fc5d09bfb7e926fbd0bc662dd51da64689476ec659e7c2f43a68c3d8c4a9c36876278918854b2ea8e8d60dc8ccc37c4077f019c8e715492247cc560c85c3108632168169206968c2665b78e8386519384b313af9d1631d420d2d5b29392783daf0c2b1935a1c079834ae39aa439df7c24dfa14b6a9e4b895d5320ffc0798fe75a415728d315bb12becfaf262f5f9dda19d64a7850bab3e68ce09ec68e34467777d0a0a2c94be8a13737c8d7f76c90ae71bf487c6f3c7ef9d29bf290c7e066d5aca99fbf8b9480b625ec14d55fdfff80cf01a1513be61af77d0591db8686b59f695a92c3b353b2c32760adc81b2c45503dbbceb7366177471a6dfdc0afa9dfb2a2869674a79a70e6909eb6f74de38d27342564b057bfb8a39db923e1e736143e652fd8a43b1eee8ffd1abdd150e36d8a41d1f3d76c72ba7d08bd2373f7107b179cdedad138b80d4c1bc4f0c9f936fe6772fef4bccf96bea404701dcea94a79e8e96cb90c5b71548eb4b9db01f44382767ba46ce3d70095afb0543d2f6fcd8d1790d9d29bb21431b87f2cf7dd4916d8eda39fecd0c560dd55d93e447b8f82f9f705fe00bb797931bef0d44d5c2ec7d7163a0933ba5d428c8f30ec56a1e638a5b5a384fbe9c1b226f20ab670293d0d7f3d196fd385c163c73ecc52ad02612fc7b01c71a807e806c79e00ccfb1b7714f8f524d9e92c69cfe58b2f196625d0e4c9737d5a4cb9a57611694a897762c4e499386373881e3125215d00e0bf8b448d60a87e4d50cf58ac8e23f635ea3bef505f6254e054dc3454fe9567a6265d2914941991258900fe53f97c3d6663fa0f9b0fb2757954d71ac9693a3be5d1b25bf80ed98b27068bdf96b6d5a0aaf831e608b0a215585ff36f23b1ab6560e9cdd67c17c0283bcac2542ec33c4b100c682e40fce48c7d34177cb01b302921f12a0b842f231ee21c1eb454cc453262d32c454b629c4592a619a76a7f69146b0c6bf2680dab33f1388b50ab80ac47faa2cc73c47b7c995fc07bb658790f2f38d744e5752b695d62165645f75695390734d837e67ef1305c1df5b8851e5149887b4f766fab5be352f7a8846bb65437384a03fb12dc5f3085f63862e26c7ec66ed97fd90afefd7ed4d696da02709dda8af86d6b182142e1db5e0c6ecb288b50310d677af4a1f7a44dd258d541e205a77a656b7dbba65e191fd5fbc0d42be3867aa53b272852adc0e7071efa19662a83bf554116aa9a72eb9ef7a8a46d95a4dcebaf807553273f1bf825e8e4ed51057b5201c0ec5281cea62daf974d694a0a3570f470f7aa39d24e3dc29fba55e9e3ee9df1657ba684ee804a66f256041040c2ab2b698f6f734552a2f7f8b2fcf306b42cd00e3528d8cc6419056ea6d0fc7d5d59223fe675d9e91b9364311594f06e040f3a73b027b574ea3619307bf1d5c5e5454987915b42cd53dcd9d499c7f266c6c60c054191b2a5d9e7943fc0e0bf453ead8469eab350ddb025d769b1310f628eee4c7d10708dfc83644f5416075eb65c2b7ba06e62233d3d826da94a4fb755cc80c0bed498db182aad5df9efe783455f638507dc62e89a21cf0dc50b567049fa0731984a9e50310db4e1a6dd23291f0329f3b9b7c2cb95fc1cdd219d5b839782c53152f4ddbb9f75179d31db968abddd8c9c660fb4d7e7da3f2c305b0e8bd5ecc55497aaa3573f1a50c50c6a5154954236edb2240e7bbbbbcdf0b8956e525d9198c944631c1b7bb8546445c0c53a80b98852285382b6b86a5c444ac9f78b5ba931b735162326422dec829ea635a7c6aac0312cde222ceec9c9161c86209e6c2dc39a84ec0bf74e3552a2d5a1d53da54743375e708072a62b14d1023781d87235b536148fd72f1253f28059047ddb553ed0f6e37ccb0ac82a90c0e81907f755e0fc346edd834688669a5fb7b59ad4f699ddfb9c575e81f4057261b804332ec33d4940b5cfa03fdaf18018a09a938b5f321e7aa96acd39a908142b0c2d42ec512696978df56bb3fc56c909d0643b2fc6952d32b6712bc6d1f3645f78d8e01eb5f1c5f9a16847508f370c78263be60c7c71630e3df500b73ec89bd396724237227473d21ebd7ae5d6febc3ae2e452ab4dddf0309ee976edd68eba0f7631bb8c2ba6535a59cde3db0374743d55a4e2ea4d017ca5352b9b3a72d81375eed8bce6a9530f529305b43c5a35022a5124cb7079af9a0a30d749df83e3dad1f76bcff4202378ad72a3160ae838ef8aba58d93e78db9395f280985cdbb3e7d6c032997afc7adeb3fa8360f144a60b688ff419877e044249f4ffe64090d50817decb899eea407a64c65df950ec60cee076387aabdd985dc93501d4fa50f5856c2de0fc478a30b02132bc051899b29b8582915b377ef94444cdebaa8451008561dced9d40ba134e84431f503dc937e98dea47469fb1f7c8309c3cb9e149605ceb93e2595f8e0cc2d79127d3b0de98666e42187e2f61e81da7d6765d46fbf029854d5e0349eb48c006265319f364d58024d3f9b67b7b7b864b7d382e82262e54f0c8319bf482360b956a65a2561c96f141031d56d9d73e326f6550e8c50938d10393b8f5b1ed53b1c2f082c2107ce5a3b7396a761f2ef3688dc9cd8502a913882122c1e3610184c94f7ff64c7f49d2e7b7ec6bb63a7df6ec2947157377922a822ce3565f594179cc5eb0db61e198e92eefaeb7dc09146c751f2a616bfce0e801433537a1eca337c7d09dcc4588a8f9f87c0d28be8a225af278329850a3d7c03230307852a8f477fcfd8966eb43f0723bc45372c47d796188dab27df2a94d4fbfcd4fe9a36474e4cfea9ef9735798f525885bcc322768cfcd5abc9b68a7755c57ec79166b398ff1b852ae21acb07976a795387ec6239569c6c3b932d6fcdb491ef24b7358f374c534c4a7093cf1dbc953d306f49cfd533f1857ad7188848e80c8419951d2039beed909226abe3365d0243c406bbc8e8d61f9d2893669ef8454717cae733155ce30d9e05a2478948bd96359cc0edbf3d2e70ab7b24cd535ed9a283e6c5039dcecb878b281b2418bf9b6b08a42edee30bcd9b72facf244472f995320ca7bcb20d7e191100f9b10bd49df5596b4f2bf4bb33779e0f979fffbd5f61453aaaaeb4947056fa6e0be5470950422992a75e55d4fbc6b0ea01767193494fda1750ec43b7cf67b78f6e30467b6ca3fc78cde74b02eaf143a3f8ea0865e55e2c6b72ede54641e1e8598531b36adeb5d7e968359edc4c3fe06d7583f6c61688d1ff0a94dd6ce50ddbb1ecd5061d0b8c120b7570905f22d111197313a177b4a447c0db168d74199e4126c61967cf8e75b5cc19ca51404d3010e5a85011d13c7d9aff0f68f9383918f84dfdb192c2514e04aaf3b8dcedeaa1c04f2389b483f312d2bd35dcdc4dbccdc7ec88decf4b1b681a66deb584f7aec5434f0ba6ad20f1582b5edc3b3ab2c6be1a72fe4b5680d1928e71b4b321c959a45a71ad33126308fe2b0f4916101c18c9cadd023da237b2c393c9e1fc5d1610025f72b27fde006391b4cf9e64b4af6c0f98f54c5c7f15d266794addaf2b4a52dce0f2a0e2a59a394aa45bae077678e89d6c8ff3d7e678eb32bb17a61f262965c26c5c9c414ef82ca14e57f0041cd978af2a9962b4cb5ac1df75bcd5ddf3b79a1baee202197c50608f5c6ecc1e4dbb0fd3b8180bf8d5be761c8375496f2959a901e12a90d02a48d92bfba8ee1a1263a69974a882ba9f75faaf6dc133a850f5002c26b53c0043885731831b5c431179eba52e15ffe15a3bbdd0bfd79c43e5de07fe3f3f55f82709c7cbbe561b6f64b109342eccdce359395d87e537f36fc81fa37aaeccd46da3d16c0ec00a3b9bd0c0907118fba240fc8e5e1f51e1a86304a0feb3d94838400a83497ef878f44c56f888fe3f57cbc38041f2f76e023a8e60e8e0447653f740277f85442a893b9ebfc6c653a2b90b3f6f61f1a86e44518161189b0131eb9133edc77516d9336c87eb54f6c92c9bd0e213ac8c60b53d750d4cee89a7279b853663815e94de504a0eb6b089182a7cbbdd2165d13ec876a8ee9b5102344f871e41dce72a73775ed8d342d60d05253dbb78c768530ea6257acf55ced4368e5b74d46eeaa51f4353563916ff1c4a0114d67e3d73e304fbbabde4bfc729edbe181479a0cda2ffa788ea44c8435bfd6f98a0d40692c591ca888d1246dd34be932b02ba7169f733cba7a53fb72576ac332a43be9f4a7d40ccfeea2ebce96014f2d348507f4125297639e3ead9930bda0f8b4123e673ed66bcf8ce345eb9a964b16dab2eaca8e83edad55c4413506a9b582120a6dc296341bd20d065d5cfea69fcb40cacb613bc3f14393bd22e9fc5394eb855aff19b5cb83ec9beea3715aa3b1919dd1a7d6c97248b8c1f652e5a4db5cd3a6b9da5acb1ae1e2865dda579fbffa3f60bfc333011bffe5282f43e495b402706170706c69636174696f6e2f6a736f6e03676465666c617465"
            }
        })

        const metaStore = writable(_metaStore);

        // rendering component
        render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression0,
                expressionConfig,
                metaStore
            },
            context: addressContext
        });

        const interpreterDropdown = screen.getByPlaceholderText("Select interpreter");
        await user.click(interpreterDropdown);

        // asserting deployers
        deployers.forEach(deployer => {
            expect(screen.getByText(deployer.address));
        });

        // asserting expressionConfig
        const expectedExpressionConfig0 = await rlc(expression0, _metaStore);
        expect(get(expressionConfig)).toEqual(expectedExpressionConfig0);
        cleanup();

        // 1
        const expression1 = rainlang` _ _: erc-1155-balance-of-batch(
            0x01
            0x02
            0x03
            0x02
            0x03
        );`
        // rendering component
        render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression1,
                expressionConfig,
                metaStore
            },
            context: addressContext
        });

        // asserting expressionConfig
        const expectedExpressionConfig1 = await rlc(expression1, _metaStore);
        expect(get(expressionConfig)).toEqual(expectedExpressionConfig1);
        cleanup();

        // 2
        const expression2 = rainlang`  
            c0: 1,
            c1: 2,
            condition: 1, 
            _ _: do-while<1>(c0 c1 condition);

            s0 s1: ,
            o0 o1: 1 2,
            condition: 3; 

            s0: ,
            _: less-than(s0 3);

            s0 s1: ,
            _: add(s0 4),
            _: add(s1 5);`;

        // rendering component
        render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression2,
                expressionConfig,
                metaStore
            },
            context: addressContext
        });

        // asserting expressionConfig
        const expectedExpressionConfig2 = await rlc(expression2, _metaStore);
        expect(get(expressionConfig)).toEqual(expectedExpressionConfig2);
    });

    it("should throw an error for invalid rainlang expressions", async () => {
        // 0
        const expression0 = rainlang`_: add(10 20)`
        // rendering component
        await render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression0,
                expressionConfig,
            },
            context: addressContext
        });

        const interpreterDropdown = screen.getByPlaceholderText("Select interpreter");
        await user.click(interpreterDropdown);

        // asserting deployers
        deployers.forEach(deployer => {
            expect(screen.getByText(deployer.address));
        });

        // asserting expressionConfig
        expect(screen.getByText(/source item expressions must end with semi/)).toBeTruthy();
        cleanup();

        // 1
        const expression1 = rainlang`¢`
        // rendering component
        await render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression1,
                expressionConfig
            },
            context: addressContext
        });

        // asserting expressionConfig
        expect(screen.findByText(/found illigal character/)).toBeTruthy();
        cleanup();

        // 2
        const expression2 = rainlang`x: read-memory<error-argument>();`
        // rendering component
        await render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression2,
                expressionConfig
            },
            context: addressContext
        });

        // asserting expressionConfig
        expect(screen.findByText(/invalid argument pattern/)).toBeTruthy();
        cleanup();

        // 3
        const expression3 = rainlang`_: add(do-while<1>(1 2 3 1 3 ) add(10 20));`
        // rendering component
        await render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression3,
                expressionConfig
            },
            context: addressContext
        });

        // asserting expressionConfig
        expect(screen.findByText(/multi output opcodes cannot be nested/)).toBeTruthy();
        cleanup();

        // 4
        const expression4 = rainlang`_: read-mem.ory<1 1>();`
        // rendering component
        await render(Parser, {
            props: {
                deployers: deployers,
                signer,
                selectedDeployer,
                raw: expression4,
                expressionConfig
            },
            context: addressContext
        });

        // asserting expressionConfig
        expect(screen.findByText(/invalid word pattern: "read-mem.ory"/)).toBeTruthy();
        expect(screen.findByText(/unknown opcode: "read-mem.ory"/)).toBeTruthy();
    });

    it("should throw an error when a context is not passed", async () => {
        try {
            render(Parser, {
                props: {
                    deployers: deployers,
                    signer,
                    raw: ""
                }
            });
        }
        catch (error) {
            expect(error.message).toContain("Context 'EVALUABLE_ADDRESSES' is missing function getDeployers");
        }
    });

});

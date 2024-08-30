package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.model.Asset;
import com.ashrith.crypto_trading_platform.model.Coin;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetServiceImpl implements AssetService{

    @Autowired
    private AssetRepository assetRepository;
    @Override
    public Asset createAsset(User user, Coin coin, double quantity) {
        Asset asset=new Asset();
        asset.setUser(user);
        asset.setCoin(coin);
        asset.setQuantity(quantity);
        asset.setBuyPrice(coin.getCurrentPrice());
        return assetRepository.save(asset);
    }

    @Override
    public Asset getAssetById(Long assetId) throws Exception {
        return assetRepository.findById(assetId).orElseThrow(()->new Exception("Asset not found"));
    }

    @Override
    public Asset getAssetByUserIdAndId(Long userId, String assetId) throws Exception {
        Asset as=assetRepository.findByUserIdAndCoinId(userId,assetId);
        if(as==null) throw new Exception("Asset can not be found for user and id");
        return as;
    }



    @Override
    public List<Asset> getUserAssets(Long userId) throws Exception {
        List<Asset> asset= assetRepository.findByUserId(userId);
        if(asset==null) throw new Exception("Assets not found for user");
        return asset;
    }

    @Override
    public Asset updateAsset(Long assetId, double quantity) throws Exception {
        Asset asset=getAssetById(assetId);
        asset.setQuantity(asset.getQuantity()+quantity);
        return assetRepository.save(asset);
    }

    public Asset setSellPrice(Long assetId, double sellPrice) throws Exception {
        Asset asset=getAssetById(assetId);
        asset.setSellPrice(sellPrice);
        return assetRepository.save(asset);
    }

    @Override
    public Asset findAssetByUserIdAndCoinId(Long userId, String coinId) {
        return assetRepository.findByUserIdAndCoinId(userId,coinId);
    }

    @Override
    public void deleteAsset(Long assetId) throws Exception {
        assetRepository.delete(getAssetById(assetId));
    }
}
